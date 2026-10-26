// Page Object: the shopping cart page.
class CartPage {
  constructor(page) {
    this.page = page;
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
