const { test } = require("@playwright/test");
const { loginPage } = require("../pages/LoginPage");
const { inventoryPage } = require("../pages/InventoryPage");
const { cartPage } = require("../pages/CartPage");
const { checkoutStep1Page } = require("../pages/CheckoutStep1Page");
const { checkoutStep2Page } = require("../pages/CheckoutStep2Page");
const { checkoutCompletePage } = require("../pages/CheckoutCompletePage");

test.describe("Saucedemo Case Inventory", (page) => {
  test.beforeEach(async ({ page }) => {
    const LoginPage = new loginPage(page);
    const InventoryPage = new inventoryPage(page);
    const CartPage = new cartPage(page);
    await LoginPage.goto();
    await LoginPage.login("standard_user", "secret_sauce");
    await LoginPage.verifyLogin();
    await InventoryPage.addProductToCart();
    await InventoryPage.gotoCart();
    await CartPage.checkoutCart();
  });
  test("TC01 - Checkout Successfull", async ({ page }) => {
    const CheckoutStep1Page = new checkoutStep1Page(page);
    const CheckoutStep2Page = new checkoutStep2Page(page);
    const CheckoutCompletePage = new checkoutCompletePage(page);
    await CheckoutStep1Page.fillCheckoutForm(
      "Margaretha",
      "Kharisma",
      "112233"
    );
    await CheckoutStep2Page.overviewCheckout();
    await CheckoutStep2Page.finishCheckout();
    await CheckoutCompletePage.overviewCheckoutComplete();
    await CheckoutCompletePage.backToHome();
  });
});
