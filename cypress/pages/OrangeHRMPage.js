/**
 * Page Object for OrangeHRM - System Users page
 * URL: https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers
 */
export class OrangeHRMPage {
  elements = {
    // Login page
    usernameInput: () => cy.get('input[name="username"]'),
    passwordInput: () => cy.get('input[name="password"]'),
    loginButton: () => cy.get('button[type="submit"]'),

    // Left side menu
    adminMenu: () => cy.get('.oxd-main-menu-item').contains('Admin'),

    // System Users search form
    searchUsernameInput: () =>
      cy.get('.oxd-form-row').first().find('.oxd-input').first(),
    userRoleDropdown: () => cy.get('.oxd-select-wrapper').first(),
    statusDropdown: () => cy.get('.oxd-select-wrapper').eq(1),
    searchButton: () => cy.get('button[type="submit"]').contains('Search'),

    // Results table
    resultsTable: () => cy.get('.oxd-table-body'),
    tableRows: () => cy.get('.oxd-table-body .oxd-table-row'),
  };

  actions = {
    login: (username = 'Admin', password = 'admin123') => {
      cy.visit('/web/index.php/auth/login');
      OrangeHRMPage.prototype.elements.usernameInput().clear().type(username);
      OrangeHRMPage.prototype.elements.passwordInput().clear().type(password);
      OrangeHRMPage.prototype.elements.loginButton().click();
    },

    navigateToSystemUsers: () => {
      cy.visit('/web/index.php/admin/viewSystemUsers');
    },

    clickAdminMenu: () => {
      OrangeHRMPage.prototype.elements.adminMenu().click();
    },

    typeUsername: (username) => {
      OrangeHRMPage.prototype.elements.searchUsernameInput().clear().type(username);
    },

    selectUserRole: (role) => {
      OrangeHRMPage.prototype.elements.userRoleDropdown().click();
      cy.get('.oxd-select-option').contains(role).click();
    },

    selectStatus: (status) => {
      OrangeHRMPage.prototype.elements.statusDropdown().click();
      cy.get('.oxd-select-option').contains(status).click();
    },

    clickSearch: () => {
      OrangeHRMPage.prototype.elements.searchButton().click();
    },
  };

  assertions = {
    verifyLoggedIn: () => {
      cy.url().should('include', '/dashboard');
    },

    verifyOnSystemUsersPage: () => {
      cy.url().should('include', '/admin/viewSystemUsers');
    },

    verifyResultsTableVisible: () => {
      OrangeHRMPage.prototype.elements.resultsTable().should('be.visible');
    },

    verifyResultsHaveRows: () => {
      OrangeHRMPage.prototype.elements.tableRows().should('have.length.greaterThan', 0);
    },

    verifyUsernameInResults: (username) => {
      OrangeHRMPage.prototype.elements.resultsTable().should('contain.text', username);
    },

    verifyRecordCount: (count) => {
      cy.get('.oxd-text').contains('Record Found').should('be.visible');
    },
  };
}

export const orangeHRMPage = new OrangeHRMPage();
export default orangeHRMPage;
