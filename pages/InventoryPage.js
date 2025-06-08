const { expect } = require("@playwright/test");
import { inventoryLocators } from "../locators/InventoryLocators";

class inventoryPage {
  constructor(page) {
    this.page = page;
    this.productAddToCart1 = page.locator(inventoryLocators.product1AddLocator);
    this.productAddToCart2 = page.locator(inventoryLocators.product2AddLocator);
    this.productRemove1 = page.locator(inventoryLocators.product1RemoveLocator);
    this.productRemove2 = page.locator(inventoryLocators.product2RemoveLocator);
    this.shoppingCartBadge = page.locator(
      inventoryLocators.shoppingCartBadgeLocator
    );
    this.shoppingCartLink = page.locator(
      inventoryLocators.shoppingCartLinkLocator
    );
  }

  async addProductToCart() {
    await this.productAddToCart1.click();
    await this.productAddToCart2.click();
    await expect(this.shoppingCartBadge).toContainText("2");
    console.log("add 2 product");
  }

  async removeProductFromCart() {
    await this.productRemove1.click();
    await this.productRemove2.click();
    // await expect(this.shoppingCartBadge).toContainText("0");
    console.log("delete 2 product");
  }

  async gotoCart() {
    await this.shoppingCartLink.click();
  }
}

module.exports = { inventoryPage };
