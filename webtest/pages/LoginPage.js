class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.loginHeading = page.getByRole('heading', { name: 'Login' });
    this.errorMessage = page.locator('.oxd-alert-content-text');
    this.requiredMessage = page.getByText('Required');
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
    this.userMenu = page.locator('.oxd-userdropdown-tab');
    this.logoutButton = page.getByRole('menuitem', { name: 'Logout' });
  }

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await this.loginHeading.waitFor({ state: 'visible' });
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async logout() {
    await this.userMenu.click();
    await this.logoutButton.click();
  }

  async isPasswordMasked() {
    return this.passwordInput.evaluate((element) => element.type === 'password');
  }
}

module.exports = { LoginPage };
