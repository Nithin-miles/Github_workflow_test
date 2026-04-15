import { iplPointsTablePage } from '../../pages/IplPointsTablePage';

// Ignore uncaught JS errors thrown by the IPL T20 website itself
// This prevents Cypress from failing tests due to 3rd-party site errors
Cypress.on('uncaught:exception', (err) => {
  console.warn('Uncaught exception from app (ignored):', err.message);
  return false;
});

describe('IPL T20 Points Table - Data Scraping & Assertions', () => {
  let iplFixture;

  before(() => {
    cy.fixture('iplTeams').then((data) => {
      iplFixture = data;
    });
  });

  beforeEach(() => {
    iplPointsTablePage.actions.visit();
    iplPointsTablePage.actions.waitForTableToLoad();
  });

  it('should load the IPL T20 points table page successfully', () => {
    cy.url().should('include', '/points-table/men');
    iplPointsTablePage.assertions.verifyTableVisible();
 
    cy.get('table tbody tr').each(($row, index) => {
      const rowText = $row.text().trim();
      cy.log(`Row ${index + 1}: ${rowText}`);
    });
 


    // Primary assertion — RCB must exist anywhere in the table body
    iplPointsTablePage.assertions.verifyRCBInTable();
    cy.log('✅ RCB is present in the IPL T20 points table');
  

    iplPointsTablePage.assertions.verifyTeamInTable(iplFixture.teamToAssert);
    cy.log(`✅ ${iplFixture.teamToAssert} confirmed in points table`);
  

    const foundTeams = [];

    cy.get('table tbody tr')
      .each(($row) => {
        const rowText = $row.text().trim();
        if (rowText) foundTeams.push(rowText);
      })
      .then(() => {
        cy.log('--- Scraped Points Table Data ---');
        foundTeams.forEach((team, i) => cy.log(`${i + 1}. ${team}`));

        // Assert RCB exists in the scraped results
        const hasRCB = foundTeams.some((row) => row.includes('RCB'));
        expect(hasRCB, 'RCB should be present in the scraped IPL points table').to.be.true;
      });
  });


});
