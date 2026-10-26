const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { users, password, products, customer } = require('../utils/testData');

test.describe('Checkout', () => {
  let checkoutPage;

  // Before each test: log in, add a backpack and open the checkout form
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard, password);
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.openCart();
    await new CartPage(page).checkout();
    checkoutPage = new CheckoutPage(page);
  });

  test('TC14 - complete a purchase', async ({ page }) => {
    await checkoutPage.fillInfo(customer.firstName, customer.lastName, customer.postalCode);
    await expect(page).toHaveURL(/checkout-step-two/);
    await checkoutPage.finishButton.click();
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('TC15 - first name is required', async () => {
    await checkoutPage.fillInfo('', customer.lastName, customer.postalCode);
    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
  });

  test('TC16 - postal code is required', async () => {
    await checkoutPage.fillInfo(customer.firstName, customer.lastName, '');
    await expect(checkoutPage.errorMessage).toContainText('Postal Code is required');
  });
});
