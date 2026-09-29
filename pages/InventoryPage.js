// Page Object: the products page (also has the menu and cart icon).
class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.items = page.locator('[data-test="inventory-item"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
  }

  // Turns "Sauce Labs Backpack" into "add-to-cart-sauce-labs-backpack"
  idFor(productName) {
    return productName.toLowerCase().replace(/ /g, '-');
  }

  async addToCart(productName) {
    await this.page.locator(`[data-test="add-to-cart-${this.idFor(productName)}"]`).click();
  }

  async removeFromCart(productName) {
    await this.page.locator(`[data-test="remove-${this.idFor(productName)}"]`).click();
  }

  async sortBy(value) {
    await this.sortDropdown.selectOption(value); // az, za, lohi, hilo
  }

  async getNames() {
    return await this.itemNames.allTextContents();
  }

  async getPrices() {
    const texts = await this.itemPrices.allTextContents(); // e.g. "$29.99"
    return texts.map((t) => parseFloat(t.replace('$', '')));
  }

  async openCart() {
    await this.cartLink.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}

module.exports = { InventoryPage };
