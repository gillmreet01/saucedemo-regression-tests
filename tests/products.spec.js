const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { users, password } = require('../utils/testData');

test.describe('Products', () => {
  let inventoryPage;

  // Before each test: log in and open the products page
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard, password);
    inventoryPage = new InventoryPage(page);
  });

  test('TC07 - shows 6 products', async () => {
    await expect(inventoryPage.items).toHaveCount(6);
  });

  test('TC08 - sort by name A to Z', async () => {
    await inventoryPage.sortBy('az');
    await expect(inventoryPage.itemNames.first()).toHaveText('Sauce Labs Backpack');
  });

  test('TC09 - sort by price low to high', async () => {
    await inventoryPage.sortBy('lohi');
    await expect(inventoryPage.itemNames.first()).toHaveText('Sauce Labs Onesie');
  });
});
