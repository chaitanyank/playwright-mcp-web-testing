module.exports = {
  testDir: './tests',
  timeout: 30000,
  fullyParallel: false,
  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
};
