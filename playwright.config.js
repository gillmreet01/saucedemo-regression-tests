// Playwright configuration - controls how all tests run
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',            // where the test files live
  timeout: 30 * 1000,            // max time for one test
  expect: { timeout: 5 * 1000 }, // max time for one assertion to pass
  retries: 0,                    // no automatic re-runs (keeps results honest)
  reporter: [
    ['list'],                                                   // live output in terminal
    ['html', { outputFolder: 'playwright-report', open: 'never' }], // HTML report
  ],
  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    screenshot: 'only-on-failure', // attach screenshot when a test fails
    video: 'retain-on-failure',    // keep video only for failed tests
    trace: 'retain-on-failure',    // keep trace only for failed tests
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
});
