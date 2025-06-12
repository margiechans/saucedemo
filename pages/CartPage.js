const { expect } = require("@playwright/test");
import { cartLocators } from "../locators/CartLocators";
import { inventoryLocators } from "../locators/InventoryLocators";

class cartPage {
  constructor(page) {
    this.page = page;
    this.product1Title = page.locator(cartLocators.product1TitleLocator);
    this.product2Title = page.locator(cartLocators.product2TitleLocator);
    this.continueButton = page.locator(cartLocators.continueButtonLocator);
    this.checkoutButton = page.locator(cartLocators.checkoutButtonLocator);
    this.titlePage = page.locator(inventoryLocators.pageTitleLocator);
    this.shoppingCartLink = page.locator(
      inventoryLocators.shoppingCartLinkLocator
    );
    this.product1Remove = page.locator(inventoryLocators.product1RemoveLocator);
    this.product2Remove = page.locator(inventoryLocators.product2RemoveLocator);
  }

  async verifyCart() {
    await expect(this.product1Title).toContainText("Sauce Labs Backpack");
    await expect(this.product2Title).toContainText("Sauce Labs Bike Light");
  }

  async continueShopping() {
    await this.continueButton.click();
    await expect(this.titlePage).toContainText("Products");
    console.log("assert continue shopping button, back to inventory page");
  }

  async checkoutCart() {
    await this.checkoutButton.click();
    await expect(this.titlePage).toContainText("Checkout: Your Information");
    console.log("assert checkout button, go to checkout step 1 page");
  }

  async removeCart() {
    await this.product1Remove.click();
    await this.product2Remove.click();
    await expect(this.product1Title).not.toBeVisible();
    await expect(this.product2Title).not.toBeVisible();
  }
}

module.exports = { cartPage };
