const { test, expect } = require('@playwright/test');
const { IplPointsTablePage } = require('../../pages/IplPointsTablePage');
const iplFixture = require('../../../cypress/fixtures/iplTeams.json');

test.describe('IPL T20 Points Table - Data Scraping & Assertions', () => {
  let pointsTablePage;

  test.beforeEach(async ({ page }) => {
    pointsTablePage = new IplPointsTablePage(page);
    await pointsTablePage.visit();
    await pointsTablePage.waitForTableToLoad();
  });

  test('should load the IPL T20 points table page successfully', async ({ page }) => {
    await expect(page).toHaveURL(/points-table\/men/);
    await expect(pointsTablePage.table).toBeVisible();
  

    const teams = await pointsTablePage.scrapeAllTeams();

    console.log('--- Scraped Points Table Data ---');
    teams.forEach((team, i) => {
      console.log(`${i + 1}. ${team.text}`);
    });

    expect(teams.length).toBeGreaterThan(0);

    const rcbPresent = await pointsTablePage.isTeamPresent('RCB');

    console.log(`RCB found in table: ${rcbPresent}`);
    expect(rcbPresent, 'RCB should be present in the IPL T20 points table').toBe(true);

    const teamToCheck = iplFixture.teamToAssert;
    const isPresent = await pointsTablePage.isTeamPresent(teamToCheck);

    console.log(`${teamToCheck} found in table: ${isPresent}`);
    expect(isPresent, `${teamToCheck} should be in the points table`).toBe(true);

    console.log('--- Scraped Teams ---');
    teams.forEach((team, i) => console.log(`${i + 1}. ${team.text}`));

    const hasRCB = teams.some((team) => team.text.includes('RCB'));
    expect(hasRCB, 'RCB must appear in the scraped IPL points table data').toBe(true);


  })
});
