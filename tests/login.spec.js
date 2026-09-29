const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { users, password } = require('../utils/testData');

test.describe('Login', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC01 - valid user can log in', async ({ page }) => {
    await loginPage.login(users.standard, password);
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(new InventoryPage(page).title).toHaveText('Products');
  });

  test('TC02 - invalid password shows error', async () => {
    await loginPage.login(users.standard, 'wrong_password');
    await expect(loginPage.errorMessage).toContainText('Username and password do not match');
  });

  test('TC03 - locked out user cannot log in', async () => {
    await loginPage.login(users.locked, password);
    await expect(loginPage.errorMessage).toContainText('this user has been locked out');
  });

  test('TC04 - empty username shows error', async () => {
    await loginPage.login('', password);
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

  test('TC05 - empty password shows error', async () => {
    await loginPage.login(users.standard, '');
    await expect(loginPage.errorMessage).toContainText('Password is required');
  });

  test('TC06 - cannot open inventory page without logging in', async ({ page }) => {
    await page.goto('/inventory.html');
    await expect(loginPage.errorMessage).toContainText("You can only access '/inventory.html' when you are logged in");
  });
});
