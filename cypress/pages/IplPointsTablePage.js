/**
 * Page Object for IPL T20 Points Table
 * URL: https://www.iplt20.com/points-table/men
 */
export class IplPointsTablePage {
  elements = {
    // Main points table container
    pointsTableContainer: () =>
      cy.get('.cb-col.cb-col-100.cb-ltst-wgt-hdr', { timeout: 15000 }),

    // Each row in the points table (team rows inside the table body)
    tableRows: () => cy.get('table tbody tr'),

    // Team name/abbreviation cells — first column of each row
    teamNameCells: () => cy.get('table tbody tr td:first-child'),

    // Team short name text elements (abbreviations like RCB, CSK, MI)
    teamShortNames: () => cy.get('td .cb-col.cb-col-50.cb-srs-stats-name'),

    // Any element that contains team short name abbreviation
    allTeamText: () => cy.get('table tbody tr'),
  };

  actions = {
    /**
     * Navigate to the IPL T20 men's points table page
     */
    visit: () => {
      cy.visit('/points-table/men');
    },

    /**
     * Wait for the points table to be fully loaded
     */
    waitForTableToLoad: () => {
      cy.get('table', { timeout: 20000 }).should('be.visible');
    },

    /**
     * Scrape all team names/abbreviations from the table
     * Returns an array of team name strings via Cypress chain
     */
    scrapeTeamNames: () => {
      const teams = [];
      cy.get('table tbody tr').each(($row) => {
        const rowText = $row.text().trim();
        if (rowText) teams.push(rowText);
      });
      return cy.wrap(teams);
    },
  };

  assertions = {
    /**
     * Assert that RCB appears anywhere in the points table
     */
    verifyRCBInTable: () => {
      cy.get('table tbody').should('contain.text', 'RCB');
    },

    /**
     * Assert a specific team name is present in the table
     * @param {string} teamName - team abbreviation e.g. 'RCB'
     */
    verifyTeamInTable: (teamName) => {
      cy.get('table tbody').should('contain.text', teamName);
    },

    /**
     * Assert the table has the expected number of teams
     * @param {number} count - expected row count
     */
    verifyTeamCount: (count) => {
      cy.get('table tbody tr').should('have.length', count);
    },

    /**
     * Assert the table is visible on the page
     */
    verifyTableVisible: () => {
      cy.get('table').should('be.visible');
    },
  };
}

export const iplPointsTablePage = new IplPointsTablePage();
export default iplPointsTablePage;
