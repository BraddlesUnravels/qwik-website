import type { BrowserContext, Page } from "@playwright/test";

export type ServiceWorkerRegistration = {
  url: string;
  scope: string | undefined;
  readyState: string;
};

export type CspViolation = {
  violatedDirective: string;
  blockedURI: string;
};

export type GtagBehaviour = "collect" | "abort" | "throw";

export type AnalyticsTraffic = {
  gtagResourceTypes: string[];
  collectContexts: string[];
};

type PageProbe = Window & {
  __serviceWorkerRegistrations?: ServiceWorkerRegistration[];
  __cspViolations?: CspViolation[];
};

export const recordPageSignals = async (page: Page) => {
  await page.addInitScript(() => {
    if (window !== window.top) return;

    const probe = window as PageProbe;
    const registrations: ServiceWorkerRegistration[] = [];
    const violations: CspViolation[] = [];
    probe.__serviceWorkerRegistrations = registrations;
    probe.__cspViolations = violations;

    document.addEventListener("securitypolicyviolation", (event) => {
      violations.push({
        violatedDirective: event.violatedDirective,
        blockedURI: event.blockedURI,
      });
    });

    if (!navigator.serviceWorker) return;

    const register = navigator.serviceWorker.register.bind(
      navigator.serviceWorker,
    );
    navigator.serviceWorker.register = (scriptURL, options) => {
      registrations.push({
        url: String(scriptURL),
        scope: options?.scope,
        readyState: document.readyState,
      });
      return register(scriptURL, options);
    };
  });
};

export const readServiceWorkerRegistrations = (page: Page) =>
  page.evaluate(() => (window as PageProbe).__serviceWorkerRegistrations ?? []);

export const readCspViolations = (page: Page) =>
  page.evaluate(() => (window as PageProbe).__cspViolations ?? []);

const corsHeaders = { "access-control-allow-origin": "*" };

// Partytown hides WorkerGlobalScope and importScripts from scripts it runs, but
// still exposes DedicatedWorkerGlobalScope, which a page never defines.
const stubScripts: Record<Exclude<GtagBehaviour, "abort">, string> = {
  collect: `fetch("https://www.google-analytics.com/g/collect?ctx=" + (typeof DedicatedWorkerGlobalScope !== "undefined" ? "worker" : "page"));`,
  throw: `throw new Error("Stubbed gtag failure");`,
};

export const stubGtag = async (
  context: BrowserContext,
  behaviour: GtagBehaviour = "collect",
) => {
  const traffic: AnalyticsTraffic = {
    gtagResourceTypes: [],
    collectContexts: [],
  };

  await context.route("https://www.googletagmanager.com/gtag/js*", (route) => {
    traffic.gtagResourceTypes.push(route.request().resourceType());

    if (behaviour === "abort") return route.abort();

    return route.fulfill({
      status: 200,
      contentType: "application/javascript",
      headers: corsHeaders,
      body: stubScripts[behaviour],
    });
  });

  await context.route("**/g/collect*", (route) => {
    const requestContext = new URL(route.request().url()).searchParams.get(
      "ctx",
    );
    if (requestContext) traffic.collectContexts.push(requestContext);

    return route.fulfill({ status: 204, headers: corsHeaders });
  });

  return traffic;
};
