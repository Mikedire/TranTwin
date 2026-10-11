import { expect, test } from "@playwright/test";

test.describe("TranTwin storefront smoke", () => {
  test("landing page renders with the TranTwin title", async ({ page }) => {
    const res = await page.goto("/");
    expect(res?.status()).toBe(200);
    await expect(page).toHaveTitle(/TranTwin/i);
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