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
  }

  async continueShopping() {
    await expect(this.product1Title).toContainText("Sauce Labs Backpack");
    await expect(this.product2Title).toContainText("Sauce Labs Bike Light");
    console.log("assert product checkout from inventory page");

    await this.continueButton.click();
    await expect(this.titlePage).toContainText("Products");
    console.log("assert continue shopping button, back to inventory page");

    await this.shoppingCartLink.click();
    await expect(this.titlePage).toContainText("Your Cart");
    console.log("assert shopping cart button, go to cart page");
  }

  async checkoutShopping() {
    await this.checkoutButton.click();
    await expect(this.titlePage).toContainText("heckout: Your Information");
    console.log("assert checkout button, go to checkout step 1 page");
  }
}

module.exports = { cartPage };
