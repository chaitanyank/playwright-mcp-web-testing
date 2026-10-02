class PIMPage {
  constructor(page) {
    this.page = page;
    this.employeeNameInput = page.locator('.oxd-input-group').filter({ hasText: 'Employee Name' }).locator('input');
    this.employeeIdInput = page.locator('.oxd-input-group').filter({ hasText: 'Employee Id' }).locator('input');
    this.employmentStatusDropdown = page.locator('.oxd-input-group').filter({ hasText: 'Employment Status' }).locator('input');
    this.includeDropdown = page.locator('.oxd-input-group').filter({ hasText: 'Include' }).locator('.oxd-select-text-input');
    this.supervisorNameInput = page.locator('.oxd-input-group').filter({ hasText: 'Supervisor Name' }).locator('input');
    this.jobTitleDropdown = page.locator('.oxd-input-group').filter({ hasText: 'Job Title' }).locator('.oxd-select-text-input');
    this.subUnitDropdown = page.locator('.oxd-input-group').filter({ hasText: 'Sub Unit' }).locator('.oxd-select-text-input');
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.resetButton = page.getByRole('button', { name: 'Reset' });
    this.addEmployeeButton = page.getByRole('button', { name: 'Add' });
    this.recordsFoundText = page.locator('div.oxd-table-card', { hasText: 'Records Found' });
    this.tableRows = page.locator('.oxd-table-card');
    this.employeeTable = page.locator('.oxd-table');
  }

  async goto() {
    await this.page.locator('.oxd-main-menu-item').filter({ hasText: 'PIM' }).click();
    await this.page.waitForURL(/\/pim\/viewEmployeeList$/, { timeout: 30000 });
  }

  async searchByName(name) {
    await this.employeeNameInput.fill(name);
    await this.searchButton.click();
  }

  async searchByEmployeeId(employeeId) {
    await this.employeeIdInput.fill(employeeId);
    await this.searchButton.click();
  }

  async applyMultipleFilters({ name, employeeId, include = 'Current Employees Only' }) {
    if (name) await this.employeeNameInput.fill(name);
    if (employeeId) await this.employeeIdInput.fill(employeeId);
    if (include) {
      await this.includeDropdown.click();
      await this.page.getByRole('option', { name: include }).click();
    }
    await this.searchButton.click();
  }

  async resetSearch() {
    await this.resetButton.click();
  }

  async getVisibleEmployeeNames() {
    return this.page.locator('.oxd-table-card .oxd-table-cell').allTextContents();
  }
}

module.exports = { PIMPage };
