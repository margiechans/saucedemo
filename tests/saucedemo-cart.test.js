const { test } = require("@playwright/test");
const { loginPage } = require("../pages/LoginPage");
const { inventoryPage } = require("../pages/InventoryPage");
const { cartPage } = require("../pages/CartPage");

test.describe("Saucedemo Case Inventory", (page) => {
  test.beforeEach(async ({ page }) => {
    const LoginPage = new loginPage(page);
    const InventoryPage = new inventoryPage(page);
    await LoginPage.goto();
    await LoginPage.login("standard_user", "secret_sauce");
    await LoginPage.verifyLogin();
    await InventoryPage.addProductToCart();
    await InventoryPage.gotoCart();
  });
  test("TC01 - Remove Product Form Cart Successfull", async ({ page }) => {
    const InventoryPage = new inventoryPage(page);
    const CartPage = new cartPage(page);
    await CartPage.removeCart();
    await CartPage.continueShopping();
    await InventoryPage.addProductToCart();
    await InventoryPage.gotoCart();
  });
  test("TC02 - Checkout Cart Successfull", async ({ page }) => {
    const CartPage = new cartPage(page);
    await CartPage.verifyCart();
    await CartPage.checkoutCart();
  });
});
