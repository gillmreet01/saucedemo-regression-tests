const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { users, password } = require('../utils/testData');

test.describe('Logout', () => {
  test('TC17 - user can log out and returns to login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard, password);
    await new InventoryPage(page).logout();
    await expect(loginPage.loginButton).toBeVisible();
  });
});
