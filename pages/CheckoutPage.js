// Page Object: the three checkout screens (info, overview, complete).
class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.subtotal = page.locator('[data-test="subtotal-label"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async fillInfo(first, last, zip) {
    if (first) await this.firstName.fill(first);
    if (last) await this.lastName.fill(last);
    if (zip) await this.postalCode.fill(zip);
    await this.continueButton.click();
  }
}

module.exports = { CheckoutPage };
