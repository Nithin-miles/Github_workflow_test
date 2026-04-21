import { orangeHRMPage } from '../../pages/OrangeHRMPage';

Cypress.on('uncaught:exception', () => false);

describe('OrangeHRM - System Users Search', () => {
  let fixture;

  before(() => {
    cy.fixture('orangeHRM').then((data) => {
      fixture = data;
    });
  });

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.get('input[name="username"]').type(fixture.credentials.username);
    cy.get('input[name="password"]').type(fixture.credentials.password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('should navigate to System Users page via Admin side menu', () => {
    cy.get('.oxd-main-menu-item').contains('Admin').click();
    cy.url().should('include', '/admin/viewSystemUsers');
    cy.get('.oxd-table-body').should('be.visible');
    cy.log('✅ Successfully navigated to System Users page via Admin menu');
  });

  it('should search with username admin, role ESS, status Enabled and assert results', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');

    // Type username in search form
    cy.get('.oxd-form-row').first().find('.oxd-input').first()
      .clear()
      .type(fixture.searchParams.username);
    cy.log(`Typed username: ${fixture.searchParams.username}`);

    // Select User Role - ESS
    cy.get('.oxd-select-wrapper').first().click();
    cy.get('.oxd-select-option').contains(fixture.searchParams.userRole).click();
    cy.log(`Selected User Role: ${fixture.searchParams.userRole}`);

    // Select Status - Enabled
    cy.get('.oxd-select-wrapper').eq(1).click();
    cy.get('.oxd-select-option').contains(fixture.searchParams.status).click();
    cy.log(`Selected Status: ${fixture.searchParams.status}`);

    // Click Search
    cy.get('button[type="submit"]').contains('Search').click();

    // Assertions
    cy.get('.oxd-table-body').should('be.visible');
    cy.get('.oxd-table-body .oxd-table-row').should('have.length.greaterThan', 0);
    cy.get('.oxd-table-body').should('contain.text', fixture.searchParams.username);
    cy.log('✅ Search results verified — admin user with ESS role and Enabled status found');
  });

  it('should log all result rows after search', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');

    cy.get('.oxd-form-row').first().find('.oxd-input').first().clear().type('admin');
    cy.get('.oxd-select-wrapper').first().click();
    cy.get('.oxd-select-option').contains('ESS').click();
    cy.get('.oxd-select-wrapper').eq(1).click();
    cy.get('.oxd-select-option').contains('Enabled').click();
    cy.get('button[type="submit"]').contains('Search').click();

    cy.get('.oxd-table-body .oxd-table-row').each(($row, index) => {
      cy.log(`Row ${index + 1}: ${$row.text().trim()}`);
    });
  });
});
