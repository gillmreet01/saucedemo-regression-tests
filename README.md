# SauceDemo Automated Regression Tests (Playwright + JavaScript)

Automated regression suite for https://www.saucedemo.com covering
**login, product listing/sorting, cart, checkout and logout** (17 test cases).

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
tests/                 test files, one per feature (each test logs in first)
utils/testData.js      users, products, customer details
docs/                  test plan and test cases, and the project report (Word and PDF)
```

## Test cases
| ID | Feature | What is checked |
|----|---------|-----------------|
| TC01-06 | Login | valid login, wrong password, locked user, empty username/password, direct URL access blocked |
| TC07-09 | Products | 6 items shown, sort A-Z, sort price low-high |
| TC10-13 | Cart | badge count, add/remove, cart page contents |
| TC14-16 | Checkout | full purchase, first name and postal code required |
| TC17 | Logout | returns to login page |

## Documents
- [Test plan and test cases](docs/SauceDemo_Test_Plan_and_Test_Cases.pdf): scope, approach, 17 test cases with steps, expected and actual results, and defects/observations.
- [Project report](docs/SauceDemo_Project_Report.pdf): full project report (introduction, literature survey, design, results, conclusion, user manual).
