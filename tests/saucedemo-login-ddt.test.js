const { test } = require("@playwright/test");
const { loginPage } = require("../pages/LoginPage");
const loginData = require("../testData/testDataLogin");

test.describe("Saucedemo Case Login", (page) => {
  loginData.forEach((data, index) => {
    test(`TC${index + 1} - Login test for ${data.username}`, async ({
      page,
    }) => {
      const LoginPage = new loginPage(page);
      await LoginPage.goto();
      await LoginPage.login(data.username, data.password);
      await LoginPage.verifyLogin2(data.expected, data.expectedErrorMsg);
    });
  });
});

test.describe("Saucedemo Case Checkout -", (page) => {
 // before --> login ja

  loginData.forEach((data, index) => {
    test(`TC${index + 1} - Login test for ${data.username}`, async ({
      page,
    }) => {
      const LoginPage = new loginPage(page);
      await LoginPage.goto();
      await LoginPage.login(data.username, data.password);
      await LoginPage.verifyLogin2(data.expected, data.expectedErrorMsg);
    });
  });
});
