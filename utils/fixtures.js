// Custom fixture: gives tests a page that is ALREADY logged in.
// Tests that need a logged-in user just ask for "inventoryPage".
const base = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { users, password } = require('./testData');

const test = base.test.extend({
  inventoryPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard, password);
    await use(new InventoryPage(page));
  },
});

module.exports = { test, expect: base.expect };
