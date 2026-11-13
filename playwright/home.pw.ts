import { expect, test } from "./support/test";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should render the main landmark and intro", async ({ page }) => {
    await expect(page.locator("#main-page-content")).toBeAttached();
    await expect(page.locator("#header-intro")).toBeAttached();
    await expect(
      page.getByText("I think in business problems.").first(),
    ).toBeAttached();
    await expect(page.getByText("I build in code").first()).toBeAttached();
  });

  test("should show the technical toolkit carousel", async ({ page }) => {
    await expect(page.getByText("Technical toolkit").first()).toBeAttached();
    const carousel = page.locator('[aria-label="Technologies used"]');
    await expect(carousel).toBeAttached();
    await expect(carousel.getByText("TypeScript").first()).toBeAttached();
  });

  test("should show the approach section", async ({ page }) => {
    await expect(page.locator("#approach")).toBeAttached();
    await expect(page.getByText("How I work").first()).toBeAttached();
    await expect(
      page.getByText("Start with the real workflow.").first(),
    ).toBeAttached();
  });

  test("should link from the banner to selected projects", async ({ page }) => {
    const link = page.getByRole("link", { name: "View projects" }).first();
    await expect(link).toHaveAttribute("href", "#selected-projects");

    await link.click();

    await expect(page.locator("#selected-projects")).toBeVisible();
  });
});
