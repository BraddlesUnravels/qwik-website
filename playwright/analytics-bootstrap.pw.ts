import { expect, test } from "@playwright/test";
import { PARTYTOWN_LIBRARY_PATH } from "../src/config/partytown";
import {
  readServiceWorkerRegistrations,
  recordPageSignals,
  stubGtag,
} from "./support/stub-gtag";

test.describe("Partytown bootstrap", () => {
  test("should register the Partytown service worker once after the page has loaded", async ({
    context,
    page,
  }) => {
    await stubGtag(context);
    await recordPageSignals(page);

    await page.goto("/");

    await expect
      .poll(async () => (await readServiceWorkerRegistrations(page)).length)
      .toBe(1);
    expect(await readServiceWorkerRegistrations(page)).toEqual([
      {
        url: expect.stringContaining(
          `${PARTYTOWN_LIBRARY_PATH}partytown-sw.js`,
        ),
        scope: PARTYTOWN_LIBRARY_PATH,
        readyState: "complete",
      },
    ]);
  });

  test("should run the gtag script in the worker and never in the page", async ({
    context,
    page,
  }) => {
    const traffic = await stubGtag(context);

    await page.goto("/");

    await expect.poll(() => traffic.collectContexts).toContain("worker");
    expect(traffic.collectContexts).not.toContain("page");
    expect(traffic.gtagResourceTypes.length).toBeGreaterThan(0);
    expect(traffic.gtagResourceTypes).not.toContain("script");
    expect(await page.evaluate(() => "gtag" in window)).toBe(false);
  });

  test("should keep navigation working with analytics running", async ({
    context,
    page,
  }) => {
    const traffic = await stubGtag(context);

    await page.goto("/");
    await expect.poll(() => traffic.collectContexts).toContain("worker");

    await page.locator('a[href="/projects/autodash"]').first().click();
    await expect(page).toHaveURL(/\/projects\/autodash$/);

    await page.goBack();
    await expect(page).toHaveURL(/\/$/);

    await page.goForward();
    await expect(page).toHaveURL(/\/projects\/autodash$/);
  });
});
