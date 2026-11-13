import { expect, test, type Page } from "@playwright/test";
import {
  readCspViolations,
  readServiceWorkerRegistrations,
  recordPageSignals,
  stubGtag,
  type AnalyticsTraffic,
  type GtagBehaviour,
} from "./support/stub-gtag";

const expectProjectNavigation = async (page: Page) => {
  await page.locator('a[href="/projects/autodash"]').first().click();
  await expect(page).toHaveURL(/\/projects\/autodash$/);
};

const expectNoPageContextAnalytics = (traffic: AnalyticsTraffic) => {
  expect(traffic.collectContexts).not.toContain("page");
  expect(traffic.gtagResourceTypes).not.toContain("script");
};

test.describe("Partytown worker failure", () => {
  test.describe("without service workers", () => {
    test.use({ serviceWorkers: "block" });

    test("should keep analytics out of the page and the site usable", async ({
      context,
      page,
    }) => {
      const traffic = await stubGtag(context);
      await recordPageSignals(page);

      await page.goto("/");
      await expect
        .poll(async () => (await readServiceWorkerRegistrations(page)).length)
        .toBe(1);
      await page.waitForLoadState("networkidle");

      expect(traffic.collectContexts).toEqual([]);
      expectNoPageContextAnalytics(traffic);
      expect(await readCspViolations(page)).toEqual([]);
      await expectProjectNavigation(page);
    });
  });

  const failureCases: { name: string; behaviour: GtagBehaviour }[] = [
    { name: "the gtag request is aborted", behaviour: "abort" },
    { name: "the gtag script throws", behaviour: "throw" },
  ];

  for (const { name, behaviour } of failureCases) {
    test(`should block the page-context retry when ${name}`, async ({
      context,
      page,
    }) => {
      const traffic = await stubGtag(context, behaviour);
      await recordPageSignals(page);

      await page.goto("/");

      await expect
        .poll(() => readCspViolations(page))
        .toContainEqual({
          violatedDirective: expect.stringMatching(/^script-src/),
          blockedURI: expect.stringContaining(
            "https://www.googletagmanager.com/gtag/js",
          ),
        });
      await page.waitForLoadState("networkidle");

      expectNoPageContextAnalytics(traffic);
      await expectProjectNavigation(page);
    });
  }
});
