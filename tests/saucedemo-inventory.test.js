const { test } = require("@playwright/test");
const { loginPage } = require("../pages/LoginPage");
const { inventoryPage } = require("../pages/InventoryPage");

test.describe("Saucedemo Case Inventory", (page) => {
  test.beforeEach(async ({ page }) => {
    const LoginPage = new loginPage(page);
    await LoginPage.goto();
    await LoginPage.login("standard_user", "secret_sauce");
    await LoginPage.verifyLogin();
  });
  test("TC01 - Add Product To Cart Successfull", async ({ page }) => {
    const InventoryPage = new inventoryPage(page);
    await InventoryPage.addProductToCart();
    await InventoryPage.gotoCart();
  });
  test("TC01 - Remove Product Form Cart Successfull", async ({ page }) => {
    const InventoryPage = new inventoryPage(page);
    await InventoryPage.addProductToCart();
    await InventoryPage.removeProductFromCart();
    await InventoryPage.addProductToCart();
    await InventoryPage.gotoCart();
  });
  test("TC03 - Sort Product with 4 method", async ({ page }) => {
    const InventoryPage = new inventoryPage(page);
    await InventoryPage.sortProductAsc();
    await InventoryPage.sortProductDesc();
    await InventoryPage.sortProductLow2High();
    await InventoryPage.sortProductHigh2Low();
  });
});
