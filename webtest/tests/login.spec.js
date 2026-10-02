const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { testCredentials } = require('../test-data/testData');

test.describe('OrangeHRM login page', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC001: Verify login page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(loginPage.loginHeading).toBeVisible();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('TC002: Verify login using valid credentials', async ({ page }) => {
    await loginPage.login(testCredentials.validUsername, testCredentials.validPassword);
    await expect(page).toHaveURL(/\/dashboard\/index$/);
    await expect(loginPage.dashboardHeading).toBeVisible();
  });

  test('TC003: Verify login using invalid username', async () => {
    await loginPage.login(testCredentials.invalidUsername, testCredentials.validPassword);
    await expect(loginPage.errorMessage).toContainText(/invalid credentials/i);
  });

  test('TC004: Verify login using invalid password', async () => {
    await loginPage.login(testCredentials.validUsername, testCredentials.invalidPassword);
    await expect(loginPage.errorMessage).toContainText(/invalid credentials/i);
  });

  test('TC005: Verify login with empty username', async () => {
    await loginPage.login('', testCredentials.validPassword);
    await expect(loginPage.requiredMessage.first()).toBeVisible();
  });

  test('TC006: Verify login with empty password', async () => {
    await loginPage.login(testCredentials.validUsername, '');
    await expect(loginPage.requiredMessage.first()).toBeVisible();
  });

  test('TC007: Verify login with both fields empty', async () => {
    await loginPage.login('', '');
    await expect(loginPage.requiredMessage.first()).toBeVisible();
  });

  test('TC008: Verify password field masks entered characters', async () => {
    await loginPage.passwordInput.fill(testCredentials.validPassword);
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  });

  test('TC009: Verify successful login navigates to Dashboard', async ({ page }) => {
    await loginPage.login(testCredentials.validUsername, testCredentials.validPassword);
    await expect(page).toHaveURL(/\/dashboard\/index$/);
    await expect(loginPage.dashboardHeading).toBeVisible();
  });

  test('TC010: Verify logout functionality', async ({ page }) => {
    await loginPage.login(testCredentials.validUsername, testCredentials.validPassword);
    await expect(loginPage.dashboardHeading).toBeVisible();
    await loginPage.logout();
    await expect(page).toHaveURL(/\/auth\/login$/);
    await expect(loginPage.loginHeading).toBeVisible();
  });
});
