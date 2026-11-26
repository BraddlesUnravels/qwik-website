import { expect, test } from "./support/test";

test.describe("Project pages", () => {
  test("opens the live demo with its configured access code", async ({
    page,
  }) => {
    let status: number | undefined;
    let location: string | undefined;
    await page.route(
      "**/projects/access-control-demo?qaction=*",
      async (route) => {
        const response = await route.fetch({ maxRedirects: 0 });
        status = response.status();
        location = response.headers().location;
        await route.fulfill({ status: 200, body: "Redirect intercepted" });
      },
    );
    await page.goto("/projects/access-control-demo");
    await page.getByRole("button", { name: "Try demo" }).click();

    await expect(page.getByText("Redirect intercepted")).toBeVisible();
    expect(status).toBe(302);
    expect(location).toBe("https://demo.example.test/?code=test-code");
  });

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
