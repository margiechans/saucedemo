const { test } = require("@playwright/test");
const { loginPage } = require("../pages/LoginPage");
const { inventoryPage } = require("../pages/InventoryPage");
const { cartPage } = require("../pages/CartPage");
const { checkoutStep1Page } = require("../pages/CheckoutStep1Page");
const { checkoutStep2Page } = require("../pages/CheckoutStep2Page");
const { checkoutCompletePage } = require("../pages/CheckoutCompletePage");

test.describe("Saucedemo Test Case TC01 - TC11", (page) => {
  test("TC01 - Login with valid credentials", async ({ page }) => {
    const LoginPage = new loginPage(page);
    await LoginPage.goto();
    await LoginPage.login("standard_user", "secret_sauce");
    await LoginPage.verifyLogin();
  });

  test("TC02 - Login with invalid credentials", async ({ page }) => {
    const LoginPage = new loginPage(page);
    await LoginPage.goto();
    await LoginPage.login("wrong", "secret_sauce");
    await LoginPage.verifyLogin();
  });

  test("TC03 - Shopping Successfull", async ({ page }) => {
    const LoginPage = new loginPage(page);
    const InventoryPage = new inventoryPage(page);
    const CartPage = new cartPage(page);
    const CheckoutStep1Page = new checkoutStep1Page(page);
    const CheckoutStep2Page = new checkoutStep2Page(page);
    const CheckoutCompletePage = new checkoutCompletePage(page);
    await LoginPage.goto();
    await LoginPage.login("standard_user", "secret_sauce");
    await LoginPage.verifyLogin();
    await InventoryPage.addProductToCart();
    await InventoryPage.removeProductFromCart();
    await InventoryPage.addProductToCart();
    await InventoryPage.gotoCart();
    await CartPage.continueShopping();
    await CartPage.checkoutShopping();
    await CheckoutStep1Page.cancelCheckout();
    await CartPage.checkoutShopping();
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
