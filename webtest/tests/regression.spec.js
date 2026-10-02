const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { testCredentials } = require('../test-data/testData');
const { assertDashboardLoaded, assertUserNavigation } = require('../utils/dashboardAssertions');

test.describe('OrangeHRM regression suite', () => {
  test('REG-001: valid login followed by dashboard smoke checks', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login(testCredentials.validUsername, testCredentials.validPassword);
    await assertDashboardLoaded(page, dashboardPage);
  });

  test('REG-002: invalid login then successful login recovery', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login(testCredentials.invalidUsername, testCredentials.invalidPassword);
    await expect(loginPage.errorMessage).toContainText(/invalid credentials/i);

    await loginPage.login(testCredentials.validUsername, testCredentials.validPassword);
    await assertDashboardLoaded(page, dashboardPage);
  });

  test('REG-003: dashboard navigation smoke test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login(testCredentials.validUsername, testCredentials.validPassword);
    await assertDashboardLoaded(page, dashboardPage);

    await dashboardPage.openMenuItem('PIM');
    await assertUserNavigation(page, /\/pim\/viewEmployeeList$/);

    await dashboardPage.openMenuItem('Leave');
    await assertUserNavigation(page, /\/leave\/viewLeaveList$/);

    await dashboardPage.openMenuItem('Recruitment');
    await assertUserNavigation(page, /\/recruitment\/viewCandidates$/);
  });
});
