import { expect, test } from "./support/test";

test.describe("TechnologyCarousel on the home page", () => {
  test("should expose the technologies landmark", async ({ page }) => {
    await page.goto("/");

    const carousel = page.locator('[aria-label="Technologies used"]');

    await expect(carousel).toBeAttached();
    await expect(carousel.getByText("TypeScript").first()).toBeAttached();
    await expect(carousel.getByText("Qwik").first()).toBeAttached();
  });
});
