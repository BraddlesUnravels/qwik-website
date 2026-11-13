import type { Page } from "@playwright/test";
import { expect, test } from "./support/test";

const leadVideo = "header video";

const scrollToBottom = (page: Page) =>
  page.evaluate(() =>
    window.scrollTo({ top: document.documentElement.scrollHeight }),
  );

test.describe("Project media smoke checks", () => {
  test("should play the project video muted at 2x and pause it offscreen", async ({
    page,
  }) => {
    await page.goto("/projects/autodash");
    const video = page.locator(leadVideo);
    await video.scrollIntoViewIfNeeded();

    await expect
      .poll(
        () =>
          video.evaluate((element: HTMLVideoElement) => ({
            paused: element.paused,
            hasProgressed: element.currentTime > 0,
            muted: element.muted,
            playbackRate: element.playbackRate,
            defaultPlaybackRate: element.defaultPlaybackRate,
          })),
        { timeout: 10_000 },
      )
      .toEqual({
        paused: false,
        hasProgressed: true,
        muted: true,
        playbackRate: 2,
        defaultPlaybackRate: 2,
      });

    await scrollToBottom(page);

    await expect
      .poll(() => video.evaluate((element: HTMLVideoElement) => element.paused))
      .toBe(true);
  });

  test("should keep the video, poster and caption usable on mobile", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/projects/autodash");
    const video = page.locator(leadVideo);
    await video.scrollIntoViewIfNeeded();

    await expect(video).toHaveAttribute("poster", /.+/);
    await expect
      .poll(() =>
        video.evaluate((element) => {
          const bounds = element.getBoundingClientRect();
          return {
            hasWidth: bounds.width > 0,
            insideLeft: bounds.left >= 0,
            insideRight: bounds.right <= 390,
          };
        }),
      )
      .toEqual({ hasWidth: true, insideLeft: true, insideRight: true });

    const caption = video
      .locator("xpath=ancestor::figure")
      .locator("figcaption");
    await expect(caption).toBeVisible();
    await expect(caption).toContainText("Compare lease balances");
  });

  test("should show a direct link when the video cannot load", async ({
    page,
  }) => {
    await page.goto("/projects/autodash");
    const video = page.locator(leadVideo);
    await video.scrollIntoViewIfNeeded();
    const status = video
      .locator("xpath=ancestor::figure")
      .locator('[role="status"]');

    await expect(status).toHaveCount(0);

    const source = await video.getAttribute("src");
    expect(source).toBeTruthy();

    await video.dispatchEvent("error", { bubbles: false, cancelable: false });

    await expect(status).toBeVisible();
    await expect(status).toContainText("This video could not be loaded");
    await expect(status.locator("a")).toHaveAttribute("href", source!);
  });
});
