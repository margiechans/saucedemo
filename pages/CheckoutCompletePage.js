const { expect } = require("@playwright/test");
import { inventoryLocators } from "../locators/InventoryLocators";
import { checkoutCompleteLocators } from "../locators/CheckoutCompleteLocators";

class checkoutCompletePage {
  constructor(page) {
    this.page = page;
    this.greenChecklist = page.locator(
      checkoutCompleteLocators.greenChecklistLocator
    );
    this.completeHeaderLabel = page.locator(
      checkoutCompleteLocators.completeHeaderLabelLocator
    );
    this.completeTextLabel = page.locator(
      checkoutCompleteLocators.completeTextLabelLocator
    );
    this.backToProductButton = page.locator(
      checkoutCompleteLocators.backToProductButtonLocator
    );
    this.titlePage = page.locator(inventoryLocators.pageTitleLocator);
  }

  async overviewCheckoutComplete() {
    await expect(this.greenChecklist).toBeVisible();
    await expect(this.completeHeaderLabel).toBeVisible();
    await expect(this.completeTextLabel).toBeVisible();
  }

  async backToHome() {
    await this.backToProductButton.click();
    await expect(this.titlePage).toContainText("Product");
  }
}

module.exports = { checkoutCompletePage };
