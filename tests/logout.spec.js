const { test, expect } = require('../utils/fixtures');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Logout', () => {
  test('TC22 - user can log out and returns to login page', async ({ page, inventoryPage }) => {
    await inventoryPage.logout();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(new LoginPage(page).loginButton).toBeVisible();
  });

  test('TC23 - after logout the inventory page is protected', async ({ page, inventoryPage }) => {
    await inventoryPage.logout();
    await page.goto('/inventory.html');
    await expect(new LoginPage(page).errorMessage).toContainText('when you are logged in');
  });
});
