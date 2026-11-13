import { expect, test } from "./support/test";

test.describe("Project pages", () => {
  test("should render the AutoDash project and its lead image", async ({
    page,
  }) => {
    const response = await page.goto("/projects/autodash");

    expect(response?.ok()).toBe(true);
  });

  test("should render a not-found page for unknown projects", async ({
    page,
  }) => {
    await page.goto("/projects/not-a-project");

    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("h1")).toContainText("Project not found");
    await expect(
      page.getByText("The requested project does not exist or has moved."),
    ).toBeVisible();
  });
});

test.describe("Mobile navigation", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should open, navigate, and close the menu", async ({ page }) => {
    const openButton = page.locator('button[aria-label="Open menu"]');
    const menuButton = page.locator(
      'button[aria-controls="mobile-navigation-links"]',
    );
    const links = page.locator("#mobile-navigation-links");

    await expect(openButton).toBeVisible();
    await openButton.click();
    await expect(menuButton).toHaveAttribute("aria-expanded", "true");

    await expect(links).toBeVisible();
    await links.getByRole("link", { name: "About" }).click();

    await expect(page).toHaveURL(/\/about\/approach$/);
    await expect(links).toBeHidden();
    await expect(openButton).toHaveAttribute("aria-expanded", "false");
  });
});
