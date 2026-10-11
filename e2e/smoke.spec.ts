import { expect, test } from "@playwright/test";

test.describe("TranTwin storefront smoke", () => {
  test("landing page renders with the TranTwin title", async ({ page }) => {
    const res = await page.goto("/");
    expect(res?.status()).toBe(200);
    await expect(page).toHaveTitle(/TranTwin/i);
  });

  test("header and footer show the TranTwin brand, never DTO4T", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByText("TranTwin").first()).toBeVisible();
    await expect(page.locator("body")).not.toContainText("DTO4T");
  });

  test("a shop landing route loads", async ({ page }) => {
    const res = await page.goto("/grocery-1");
    expect(res?.ok()).toBeTruthy();
  });

  test("checkout route is reachable", async ({ page }) => {
    const res = await page.goto("/checkout");
    expect(res?.ok()).toBeTruthy();
  });

  test("AI assistant route is reachable", async ({ page }) => {
    const res = await page.goto("/clinic");
    expect(res?.ok()).toBeTruthy();
    await expect(page.getByText(/digital capabilities/i)).toBeVisible();
  });
});