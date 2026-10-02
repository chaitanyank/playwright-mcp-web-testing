class DashboardPage {
  constructor(page) {
    this.page = page;
    this.dashboardTitle = page.locator('.oxd-topbar-header-title');
    this.profileMenu = page.locator('.oxd-userdropdown-tab');
    this.mainMenuItems = page.locator('.oxd-main-menu-item');
    this.timeAtWorkWidget = page.getByText('Time at Work', { exact: true });
    this.myActionsWidget = page.getByText('My Actions', { exact: true });
    this.quickLaunchWidget = page.getByText('Quick Launch', { exact: true });
    this.buzzLatestPostsWidget = page.getByText('Buzz Latest Posts', { exact: true });
    this.employeeLeaveWidget = page.getByText('Employees on Leave Today', { exact: true });
  }

  async openMenuItem(itemName) {
    await this.mainMenuItems.filter({ hasText: itemName }).click();
  }

  async waitForDashboardVisible() {
    await this.dashboardTitle.waitFor({ state: 'visible' });
  }
}

module.exports = { DashboardPage };
