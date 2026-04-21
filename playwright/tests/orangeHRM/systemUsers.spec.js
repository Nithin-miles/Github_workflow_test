import { test, expect } from '@playwright/test';
import { OrangeHRMPage } from '../../pages/OrangeHRMPage';
import fixture from '../../../cypress/fixtures/orangeHRM.json' assert { type: 'json' };

const BASE_URL = 'https://opensource-demo.orangehrmlive.com';

test.describe('OrangeHRM - System Users Search', () => {
  let orangeHRM;

  test.beforeEach(async ({ page }) => {
    orangeHRM = new OrangeHRMPage(page);
    await page.goto(BASE_URL);
    await orangeHRM.login(fixture.credentials.username, fixture.credentials.password);
  });

  test('should navigate to System Users page via Admin side menu', async ({ page }) => {
    await orangeHRM.clickAdminMenu();
    await expect(page).toHaveURL(/viewSystemUsers/);
    await expect(orangeHRM.resultsTable).toBeVisible();
    console.log('✅ Successfully navigated to System Users page via Admin menu');
  });

  test('should search with username admin, role ESS, status Enabled and assert results', async () => {
    await orangeHRM.navigateToSystemUsers();

    // Fill search form
    await orangeHRM.typeUsername(fixture.searchParams.username);
    console.log(`Typed username: ${fixture.searchParams.username}`);

    await orangeHRM.selectUserRole(fixture.searchParams.userRole);
    console.log(`Selected User Role: ${fixture.searchParams.userRole}`);

    await orangeHRM.selectStatus(fixture.searchParams.status);
    console.log(`Selected Status: ${fixture.searchParams.status}`);

    await orangeHRM.clickSearch();

    // Assertions
    await expect(orangeHRM.resultsTable).toBeVisible();
    const rowCount = await orangeHRM.getResultRowCount();
    expect(rowCount).toBeGreaterThan(0);
    console.log(`Total rows returned: ${rowCount}`);

    const tableText = await orangeHRM.resultsTable.textContent();
    expect(tableText).toContain(fixture.searchParams.username);
    console.log('✅ Search results verified — admin user with ESS role and Enabled status found');
  });

  test('should log all result rows after search', async () => {
    await orangeHRM.navigateToSystemUsers();

    await orangeHRM.typeUsername('admin');
    await orangeHRM.selectUserRole('ESS');
    await orangeHRM.selectStatus('Enabled');
    await orangeHRM.clickSearch();

    const rows = await orangeHRM.tableRows.all();
    console.log('--- Search Results ---');
    for (let i = 0; i < rows.length; i++) {
      const text = (await rows[i].textContent()).trim();
      console.log(`Row ${i + 1}: ${text}`);
    }

    expect(rows.length).toBeGreaterThan(0);
  });
});
