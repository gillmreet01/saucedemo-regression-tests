const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { users, password, products } = require('../utils/testData');

test.describe('Cart', () => {
  let inventoryPage;

  // Before each test: log in and open the products page
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard, password);
    inventoryPage = new InventoryPage(page);
  });

  test('TC10 - adding an item updates the cart badge', async () => {
    await inventoryPage.addToCart(products.backpack);
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('TC11 - adding two items shows badge 2', async () => {
    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.addToCart(products.bikeLight);
    await expect(inventoryPage.cartBadge).toHaveText('2');
  });

  test('TC12 - removing an item clears the badge', async () => {
    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.removeFromCart(products.backpack);
    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });

  test('TC13 - cart page lists the added item', async ({ page }) => {
    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.openCart();
    const cartPage = new CartPage(page);
    await expect(page).toHaveURL(/cart\.html/);
    await expect(cartPage.itemNames).toHaveText([products.backpack]);
  });
});
