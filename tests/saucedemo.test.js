const { test, expect } = require("@playwright/test");

//const BASE_URL = "https://www.saucedemo.com";

const login = async (page, username, password) => {
  await page.goto("/");
  await page.fill("#user-name", username);
  await page.fill("#password", password);
  await page.click("#login-button");
};

test.describe("Saucedemo Test Case TC01 - TC11", () => {
  test("TC01 - Login with valid credentials", async ({ page }) => {
    await login(page, "standard_user", "secret_sauce");
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test("TC02 - Login with invalid username", async ({ page }) => {
    await login(page, "invalid_user", "secret_sauce");
    await expect(page.locator('[data-test="error"]')).toContainText(
      "Username and password do not match"
    );
  });

  test("TC03 - Login with empty password", async ({ page }) => {
    await login(page, "standard_user", "");
    await expect(page.locator('[data-test="error"]')).toContainText(
      "Password is required"
    );
  });

  test("TC04 - Add a product to cart from Inventory page", async ({ page }) => {
    await login(page, "standard_user", "secret_sauce");
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
  });

  test("TC05 - Navigate to cart page", async ({ page }) => {
    await login(page, "standard_user", "secret_sauce");
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click(".shopping_cart_link");
    await expect(page).toHaveURL(/.*cart.html/);
  });

  test("TC06 - Verify product exists in the cart", async ({ page }) => {
    await login(page, "standard_user", "secret_sauce");
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click(".shopping_cart_link");
    await expect(page.locator(".cart_item")).toContainText(
      "Sauce Labs Backpack"
    );
  });

  test("TC07 - Click Checkout button on cart page", async ({ page }) => {
    await login(page, "standard_user", "secret_sauce");
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click(".shopping_cart_link");
    await page.click('[data-test="checkout"]');
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
  });

  test("TC08 - Fill checkout form with valid data and continue", async ({
    page,
  }) => {
    await login(page, "standard_user", "secret_sauce");
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click(".shopping_cart_link");
    await page.click('[data-test="checkout"]');

    await page.fill('[data-test="firstName"]', "Maya");
    await page.fill('[data-test="lastName"]', "QA");
    await page.fill('[data-test="postalCode"]', "12345");
    await page.click('[data-test="continue"]');

    await expect(page).toHaveURL(/.*checkout-step-two.html/);
  });

  test("TC09 - Verify product on overview page", async ({ page }) => {
    await login(page, "standard_user", "secret_sauce");
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click(".shopping_cart_link");
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', "Maya");
    await page.fill('[data-test="lastName"]', "QA");
    await page.fill('[data-test="postalCode"]', "12345");
    await page.click('[data-test="continue"]');

    await expect(page.locator(".cart_item")).toContainText(
      "Sauce Labs Backpack"
    );
  });

  test("TC10 - Complete the order by clicking Finish", async ({ page }) => {
    await login(page, "standard_user", "secret_sauce");
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click(".shopping_cart_link");
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', "Maya");
    await page.fill('[data-test="lastName"]', "QA");
    await page.fill('[data-test="postalCode"]', "12345");
    await page.click('[data-test="continue"]');
    await page.click('[data-test="finish"]');
    await expect(page.locator(".complete-header")).toHaveText(
      "Thank you for your order!"
    );
  });

  test("TC11 - Logout from the menu", async ({ page }) => {
    await login(page, "standard_user", "secret_sauce");
    await page.click("#react-burger-menu-btn");
    await page.waitForTimeout(500); // tunggu menu terbuka
    await page.click("#logout_sidebar_link");
    await expect(page).toHaveURL("/");
  });
});
