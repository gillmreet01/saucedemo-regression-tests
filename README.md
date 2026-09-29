# SauceDemo Automated Regression Tests (Playwright + JavaScript)

Automated regression suite for https://www.saucedemo.com covering
**login, product listing/sorting, cart, checkout and logout** (23 test cases).

## Setup
```bash
npm install
npx playwright install chromium   # one-time browser download
```

## Run
```bash
npm test               # all tests (headless)
npm run test:headed    # watch the browser
npm run test:login     # or :products :cart :checkout :logout
npm run report         # open the HTML report
```
Reports are written to `playwright-report/` (HTML). Failed tests also keep a
screenshot, video and trace in `test-results/`.

## Structure
```
playwright.config.js   settings: base URL, reporters, screenshots
pages/                 Page Object Model - one class per page (locators + actions)
tests/                 test files, one per feature
utils/testData.js      users, products, customer details
utils/fixtures.js      "inventoryPage" fixture = already logged in
```

## Test cases
| ID | Feature | What is checked |
|----|---------|-----------------|
| TC01-06 | Login | valid login, wrong password, locked user, empty username/password, direct URL access blocked |
| TC07-11 | Products | 6 items shown, sort A-Z, Z-A, price low-high, high-low |
| TC12-16 | Cart | badge count, add/remove, cart page contents |
| TC17-21 | Checkout | full purchase, required-field validation, cart cleared after order |
| TC22-23 | Logout | returns to login, protected pages blocked again |

## Viva notes
- **Page Object Model**: locators live in `pages/`, so if the UI changes we fix one file, not every test.
- **Fixture**: `utils/fixtures.js` logs in before tests that need it (no repeated code).
- **Locators**: use stable `data-test` attributes.
- **Assertions**: `expect(...)` web-first assertions auto-wait until true or timeout.
- **Independence**: each test gets a fresh browser context, so tests don't affect each other.
