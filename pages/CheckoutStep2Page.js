const { expect } = require("@playwright/test");
import { inventoryLocators } from "../locators/InventoryLocators";
import { cartLocators } from "../locators/CartLocators";
import { checkoutStep2Locators } from "../locators/CheckoutStep2Locators";

class checkoutStep2Page {
  constructor(page) {
    this.page = page;
    this.paymentInfoLabel = page.locator(
      checkoutStep2Locators.paymentInfoLabelLocator
    );
    this.paymentInfoValue = page.locator(
      checkoutStep2Locators.paymentInfoValueLocator
    );
    this.shippingInfoLabel = page.locator(
      checkoutStep2Locators.shippingInfoLabelLocator
    );
    this.shippingInfoValue = page.locator(
      checkoutStep2Locators.shippingInfoValueLocator
    );
    this.totalInfoLabel = page.locator(
      checkoutStep2Locators.totalInfoLabelLocator
    );
    this.subTotalLabel = page.locator(
      checkoutStep2Locators.subTotalLabelLocator
    );
    this.taxLabel = page.locator(checkoutStep2Locators.taxLabelLocator);
    this.totalLabel = page.locator(checkoutStep2Locators.totalLabelLocator);
    this.finishButton = page.locator(checkoutStep2Locators.finishButtonLocator);
    this.product1Title = page.locator(cartLocators.product1TitleLocator);
    this.product2Title = page.locator(cartLocators.product2TitleLocator);
    this.titlePage = page.locator(inventoryLocators.pageTitleLocator);
  }

  async overviewCheckout() {
    await expect(this.product1Title).toContainText("Sauce Labs Backpack");
    await expect(this.product2Title).toContainText("Sauce Labs Bike Light");
    await expect(this.paymentInfoLabel).toBeVisible();
    await expect(this.paymentInfoValue).toContainText("SauceCard #31337");
    await expect(this.shippingInfoLabel).toBeVisible();
    await expect(this.shippingInfoValue).toContainText(
      "Free Pony Express Delivery!"
    );
    await expect(this.totalInfoLabel).toBeVisible();
    await expect(this.subTotalLabel).toBeVisible();
    await expect(this.taxLabel).toBeVisible();
    await expect(this.totalLabel).toBeVisible();
  }

  async finishCheckout() {
    await this.finishButton.click();
    await expect(this.titlePage).toContainText("Checkout: Complete!");
  }
}

module.exports = { checkoutStep2Page };
