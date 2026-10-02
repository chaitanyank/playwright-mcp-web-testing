const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { testCredentials } = require('../test-data/testData');

test.describe('OrangeHRM dashboard', () => {
  let loginPage;
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(testCredentials.validUsername, testCredentials.validPassword);
    await dashboardPage.waitForDashboardVisible();
  });

  test('DASH-001: Verify Dashboard is displayed', async () => {
    await expect(dashboardPage.dashboardTitle).toBeVisible();
    await expect(dashboardPage.dashboardTitle).toContainText('Dashboard');
  });

  test('DASH-002: Verify Dashboard URL', async ({ page }) => {
    await expect(page).toHaveURL(/\/dashboard\/index$/);
  });

  test('DASH-003: Verify main navigation menu', async () => {
    const menuItems = [
      'Admin',
      'PIM',
      'Leave',
      'Time',
      'Recruitment',
      'My Info',
      'Performance',
      'Dashboard',
      'Directory',
      'Maintenance',
      'Claim',
      'Buzz',
    ];

    for (const item of menuItems) {
      await expect(dashboardPage.mainMenuItems.filter({ hasText: item })).toBeVisible();
    }
  });

  test('DASH-004: Verify user profile is displayed', async () => {
    await expect(dashboardPage.profileMenu).toBeVisible();
    await expect(dashboardPage.profileMenu).toContainText(/manda user/i);
  });

  test('DASH-005: Verify dashboard widgets are displayed', async () => {
    await expect(dashboardPage.timeAtWorkWidget).toBeVisible();
    await expect(dashboardPage.myActionsWidget).toBeVisible();
    await expect(dashboardPage.quickLaunchWidget).toBeVisible();
    await expect(dashboardPage.buzzLatestPostsWidget).toBeVisible();
    await expect(dashboardPage.employeeLeaveWidget).toBeVisible();
  });

  test('DASH-006: Verify navigation from Dashboard to PIM', async ({ page }) => {
    await dashboardPage.openMenuItem('PIM');
    await expect(page).toHaveURL(/\/pim\/viewEmployeeList$/);
  });

  test('DASH-007: Verify navigation from Dashboard to Leave', async ({ page }) => {
    await dashboardPage.openMenuItem('Leave');
    await expect(page).toHaveURL(/\/leave\/viewLeaveList$/);
  });

  test('DASH-008: Verify navigation from Dashboard to Recruitment', async ({ page }) => {
    await dashboardPage.openMenuItem('Recruitment');
    await expect(page).toHaveURL(/\/recruitment\/viewCandidates$/);
  });
});
