const { expect } = require("@playwright/test");
import { loginLocators } from "../locators/LoginLocators";

class loginPage {
  constructor(page) {
    this.page = page;
    this.usernameField = page.locator(loginLocators.usernameLocator);
    this.passwordField = page.locator(loginLocators.passwordLocator);
    this.loginButton = page.locator(loginLocators.loginButtonLocator);
    this.errorMsg = page.locator(loginLocators.errorMsgLocator);
  }

  async goto() {
    await this.page.goto("/");
  }

  async login(username, password) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async verifyLogin() {
    if (await this.page.url().includes("inventory.html")) {
      // Login Berhasil
      await expect(this.page).toHaveURL(/.*inventory.html/);
      await expect(this.page.getByText("Swag Labs")).toBeVisible();
      console.log("Login Success");
    } else {
      await expect(this.errorMsg).toBeVisible();
      await expect(this.errorMsg).toContainText(
        "Username and password do not match"
      );
      console.log("Login Failed");
    }
  }

  async verifyLogin2(expected, expectedErrorMsg) {
    if (expected === "success") {
      // Login Berhasil
      await expect(this.page).toHaveURL(/.*inventory.html/);
      await expect(this.page.getByText("Swag Labs")).toBeVisible();
      console.log("Login Success");
    } else {
      await expect(this.errorMsg).toBeVisible();
      await expect(this.errorMsg).toContainText(expectedErrorMsg);
      console.log("Login Failed");
    }
  }

  async loginSuccess(username, password) {
    await this.goto();
    await this.login(username, password);
    await this.verifyLogin();
  }
}

module.exports = { loginPage };
