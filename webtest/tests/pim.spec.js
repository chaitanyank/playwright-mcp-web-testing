const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { PIMPage } = require('../pages/PIMPage');
const { testCredentials } = require('../test-data/testData');

test.describe('OrangeHRM PIM module', () => {
  let loginPage;
  let pimPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    pimPage = new PIMPage(page);

    await loginPage.goto();
    await loginPage.login(testCredentials.validUsername, testCredentials.validPassword);
    await pimPage.goto();
  });

  test('PIM-001: Verify Employee List page', async ({ page }) => {
    await expect(page).toHaveURL(/\/pim\/viewEmployeeList$/);
    await expect(page.getByText('Employee Information')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Reset' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add' })).toBeVisible();
  });

  test('PIM-002: Search employee by name', async ({ page }) => {
    const employeeName = 'Adan Kyle';
    await pimPage.searchByName(employeeName);
    await expect(page.getByText(employeeName, { exact: false })).toBeVisible();
  });

  test('PIM-003: Search employee by Employee ID', async ({ page }) => {
    const employeeId = '04841234';
    await pimPage.searchByEmployeeId(employeeId);
    await expect(page.getByText(employeeId, { exact: false })).toBeVisible();
  });

  test('PIM-004: Search employee using multiple filters', async ({ page }) => {
    const employeeName = 'Adan Kyle';
    const employeeId = '453756';

    await pimPage.applyMultipleFilters({
      name: employeeName,
      employeeId,
      include: 'Current Employees Only',
    });

    const employeeRow = page.locator('.oxd-table-card')
      .filter({ hasText: employeeName })
      .filter({ hasText: employeeId })
      .first();

    await expect(employeeRow).toBeVisible();
  });

  test('PIM-005: Reset employee search', async ({ page }) => {
    await pimPage.searchByName('Adan Kyle');
    await pimPage.resetSearch();
    await expect(pimPage.employeeNameInput).toHaveValue('');
    await expect(pimPage.employeeIdInput).toHaveValue('');
  });

  test('PIM-006: Verify employee appears in search results', async ({ page }) => {
    const employeeName = 'Adan Kyle';
    await pimPage.searchByName(employeeName);
    const row = page.locator('.oxd-table-card').filter({ hasText: employeeName }).first();
    await expect(row).toBeVisible();
  });

  test('PIM-007: Verify no-result scenario', async ({ page }) => {
    const noResultName = 'NoEmployeeFoundTestXYZ';
    await pimPage.searchByName(noResultName);
    await expect(page.locator('body')).toContainText(/No Records Found|No records found/i);
  });
});
