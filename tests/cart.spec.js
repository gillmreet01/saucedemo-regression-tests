const { test, expect } = require('../utils/fixtures');
const { CartPage } = require('../pages/CartPage');
const { products } = require('../utils/testData');

test.describe('Cart', () => {
  test('TC12 - adding an item updates the cart badge', async ({ inventoryPage }) => {
    await inventoryPage.addToCart(products.backpack);
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('TC13 - adding two items shows badge 2', async ({ inventoryPage }) => {
    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.addToCart(products.bikeLight);
    await expect(inventoryPage.cartBadge).toHaveText('2');
  });

  test('TC14 - removing an item on the products page clears the badge', async ({ inventoryPage }) => {
    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.removeFromCart(products.backpack);
    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });

  test('TC15 - cart page lists the added item', async ({ page, inventoryPage }) => {
    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.openCart();
    const cartPage = new CartPage(page);
    await expect(page).toHaveURL(/cart\.html/);
    await expect(cartPage.itemNames).toHaveText([products.backpack]);
  });

  test('TC16 - removing an item on the cart page empties the cart', async ({ page, inventoryPage }) => {
    await inventoryPage.addToCart(products.backpack);
    await inventoryPage.openCart();
    const cartPage = new CartPage(page);
    await cartPage.removeItem(products.backpack);
    await expect(cartPage.items).toHaveCount(0);
  });
});
