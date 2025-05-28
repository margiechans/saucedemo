import { test, expect } from "@playwright/test";

test.describe("Scenario Saucedemo Test", () => {
  test("Login Successfull", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await expect(page.getByText("Swag Labs")).toBeVisible();
  });

  test("Invalid Login", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("margiechan");
    await page.locator('[data-test="password"]').fill("63635768");
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("Login for Empty Password", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standart_user");
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText(
      "Epic sadface: Password is required"
    );
  });

  test("Add To Cart & Checkout", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(
      page.locator('[data-test="shopping-cart-badge"]')
    ).toContainText("1");
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="title"]')).toContainText(
      "Your Cart"
    );
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill("margaretha");
    await page.locator('[data-test="lastName"]').fill("kharisma");
    await page.locator('[data-test="postalCode"]').fill("112233");
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="title"]')).toContainText(
      "Checkout: Overview"
    );
    await page.locator('[data-test="finish"]').click();
    await expect(page.locator('[data-test="complete-header"]')).toContainText(
      "Thank you for your order!"
    );
    await page.locator('[data-test="back-to-products"]').click();
  });
});
