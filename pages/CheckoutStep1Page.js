const { expect } = require("@playwright/test");
import { checkoutStep1Locators } from "../locators/CheckoutStep1Locators";
import { inventoryLocators } from "../locators/InventoryLocators";
import { loginLocators } from "../locators/LoginLocators";

class checkoutStep1Page {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.locator(checkoutStep1Locators.firstNameLocator);
    this.lastNameField = page.locator(checkoutStep1Locators.lastNameLocator);
    this.postalCodeField = page.locator(
      checkoutStep1Locators.postalCodeLocator
    );
    this.cancelButton = page.locator(checkoutStep1Locators.cancelButtonLocator);
    this.continueButton = page.locator(
      checkoutStep1Locators.continueButtonLocator
    );
    this.titlePage = page.locator(inventoryLocators.pageTitleLocator);
    this.errorMsg = page.locator(loginLocators.errorMsgLocator);
  }

  async fillCheckoutForm(firstName, lastName, postalCode) {
    await this.firstNameField.fill(firstName);
    await this.lastNameField.fill(lastName);
    await this.postalCodeField.fill(postalCode);
    await this.continueButton.click();
    //await expect(this.titlePage).toContainText("Checkout: Overview");
  }

  async cancelCheckout() {
    await this.cancelButton.click();
    await expect(this.titlePage).toContainText("Your Cart");
  }

  async verifyCheckout() {
    if (await this.page.url().includes("checkout-step-one.html")) {
      //checkout berhasil
      await expect(this.page).toHaveURL(/.*checkout-step-one.html/);
      await expect(this.page.getByText("Swag Labs")).toBeVisible();
    } else {
      await expect(this.errorMsg).toBeVisible();
      await expect(this.errorMsg).toContainText(
        "Error: First Name is required"
      );
    }
  }
}

module.exports = { checkoutStep1Page };
