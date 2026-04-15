/**
 * Playwright Page Object for IPL T20 Points Table
 * URL: https://www.iplt20.com/points-table/men
 */
class IplPointsTablePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.url = '/points-table/men';

    // Locators
    this.table = page.locator('table').first();
    this.tableRows = page.locator('table tbody tr');
    this.teamNameCells = page.locator('table tbody tr td:first-child');
  }

  /**
   * Navigate to the IPL T20 men's points table page
   */
  async visit() {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Wait for the points table to be visible
   */
  async waitForTableToLoad() {
    await this.table.waitFor({ state: 'visible', timeout: 20000 });
  }

  /**
   * Scrape all team data from the points table
   * @returns {Promise<Array<{text: string}>>} array of row text content
   */
  async scrapeAllTeams() {
    await this.waitForTableToLoad();
    const rows = await this.tableRows.all();
    const teams = [];

    for (const row of rows) {
      const text = (await row.textContent()).trim();
      if (text) teams.push({ text });
    }

    return teams;
  }

  /**
   * Get all team abbreviations visible in the table
   * @returns {Promise<string[]>}
   */
  async getTeamAbbreviations() {
    await this.waitForTableToLoad();
    const tableText = await this.table.textContent();
    return tableText;
  }

  /**
   * Check if a specific team is present in the points table
   * @param {string} teamName - e.g. 'RCB'
   * @returns {Promise<boolean>}
   */
  async isTeamPresent(teamName) {
    await this.waitForTableToLoad();
    const tableText = await this.table.textContent();
    return tableText.includes(teamName);
  }

  /**
   * Get the number of teams (rows) in the table
   * @returns {Promise<number>}
   */
  async getTeamCount() {
    await this.waitForTableToLoad();
    return await this.tableRows.count();
  }
}

module.exports = { IplPointsTablePage };
