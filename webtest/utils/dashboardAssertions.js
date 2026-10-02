const { expect } = require('@playwright/test');

async function assertDashboardLoaded(page, dashboardPage) {
  await expect(page).toHaveURL(/\/dashboard\/index$/);
  await expect(dashboardPage.dashboardTitle).toBeVisible();
  await expect(dashboardPage.dashboardTitle).toContainText('Dashboard');
  await expect(dashboardPage.profileMenu).toBeVisible();

  const expectedMenu = [
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

  for (const item of expectedMenu) {
    await expect(dashboardPage.mainMenuItems.filter({ hasText: item })).toBeVisible();
  }

  const requiredWidgets = [
    dashboardPage.timeAtWorkWidget,
    dashboardPage.myActionsWidget,
    dashboardPage.quickLaunchWidget,
    dashboardPage.buzzLatestPostsWidget,
    dashboardPage.employeeLeaveWidget,
  ];

  for (const widget of requiredWidgets) {
    await expect(widget).toBeVisible();
  }
}

async function assertUserNavigation(page, targetPattern) {
  await expect(page).toHaveURL(targetPattern);
}

module.exports = {
  assertDashboardLoaded,
  assertUserNavigation,
};
