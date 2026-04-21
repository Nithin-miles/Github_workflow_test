/**
 * Playwright Page Object for OrangeHRM - System Users page
 * URL: https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers
 */
class OrangeHRMPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Login page locators
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');

    // Side menu
    this.adminMenu = page.locator('.oxd-main-menu-item', { hasText: 'Admin' });

    // Search form locators
    this.searchUsernameInput = page.locator('.oxd-form-row').first().locator('.oxd-input').first();
    this.userRoleDropdown = page.locator('.oxd-select-wrapper').first();
    this.statusDropdown = page.locator('.oxd-select-wrapper').nth(1);
    this.searchButton = page.locator('button[type="submit"]', { hasText: 'Search' });

    // Results table
    this.resultsTable = page.locator('.oxd-table-body');
    this.tableRows = page.locator('.oxd-table-body .oxd-table-row');
    this.recordCount = page.locator('.oxd-text', { hasText: 'Record Found' });
  }

  /**
   * Login to OrangeHRM
   */
  async login(username = 'Admin', password = 'admin123') {
    await this.page.goto('/web/index.php/auth/login');
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForURL('**/dashboard**');
  }

  /**
   * Navigate to System Users page
   */
  async navigateToSystemUsers() {
    await this.page.goto('/web/index.php/admin/viewSystemUsers');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click Admin in the left side menu
   */
  async clickAdminMenu() {
    await this.adminMenu.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Type a username in the search form
   */
  async typeUsername(username) {
    await this.searchUsernameInput.clear();
    await this.searchUsernameInput.fill(username);
  }

  /**
   * Select a User Role from the dropdown
   */
  async selectUserRole(role) {
    await this.userRoleDropdown.click();
    await this.page.locator('.oxd-select-option', { hasText: role }).click();
  }

  /**
   * Select a Status from the dropdown
   */
  async selectStatus(status) {
    await this.statusDropdown.click();
    await this.page.locator('.oxd-select-option', { hasText: status }).click();
  }

  /**
   * Click the Search button and wait for results
   */
  async clickSearch() {
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get the count of result rows
   */
  async getResultRowCount() {
    return await this.tableRows.count();
  }
}

export { OrangeHRMPage };
