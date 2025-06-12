const { test } = require("@playwright/test");
const { loginPage } = require("../pages/LoginPage");

test.describe("Saucedemo Case Login", (page) => {
  test.beforeEach(async ({ page }) => {
    const LoginPage = new loginPage(page);
    await LoginPage.goto();
  });
  test("TC01 - Login with valid credentials", async ({ page }) => {
    const LoginPage = new loginPage(page);
    await LoginPage.login("standard_user", "secret_sauce");
    await LoginPage.verifyLogin();
  });

  test("TC02 - Login with invalid credentials", async ({ page }) => {
    const LoginPage = new loginPage(page);
    await LoginPage.login("wrong", "secret_sauce");
    await LoginPage.verifyLogin();
  });
});
