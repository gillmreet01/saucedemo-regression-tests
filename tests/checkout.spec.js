const { test, expect } = require('../utils/fixtures');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { products, customer } = require('../utils/testData');

test.describe('Checkout', () => {
  let cartPage;
  let checkoutPage;

  // Before each test: add a backpack and go to the checkout info form
  test.beforeEach(async ({ page, inventoryPage }) => {
    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.openCart();
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await cartPage.checkout();
  });

  test('TC17 - complete a purchase end to end', async ({ page }) => {
    await checkoutPage.fillInfo(customer.firstName, customer.lastName, customer.postalCode);
    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(checkoutPage.itemNames).toHaveText([products.backpack]);
    await expect(checkoutPage.subtotal).toContainText('$29.99');

    await checkoutPage.finishButton.click();
    await expect(page).toHaveURL(/checkout-complete/);
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('TC18 - first name is required', async () => {
    await checkoutPage.fillInfo('', customer.lastName, customer.postalCode);
    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
  });

  test('TC19 - last name is required', async () => {
    await checkoutPage.fillInfo(customer.firstName, '', customer.postalCode);
    await expect(checkoutPage.errorMessage).toContainText('Last Name is required');
  });

  test('TC20 - postal code is required', async () => {
    await checkoutPage.fillInfo(customer.firstName, customer.lastName, '');
    await expect(checkoutPage.errorMessage).toContainText('Postal Code is required');
  });

  test('TC21 - cart is empty after order is completed', async ({ page, inventoryPage }) => {
    await checkoutPage.fillInfo(customer.firstName, customer.lastName, customer.postalCode);
    await checkoutPage.finishButton.click();
    await checkoutPage.backHomeButton.click();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });
});
