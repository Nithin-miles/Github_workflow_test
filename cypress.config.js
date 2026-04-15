const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.iplt20.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: false,
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 30000,
    chromeWebSecurity: false, // required for external sites
    video: false,
    screenshotOnRunFailure: true,
    watchForFileChanges: false
  },
  reporter: 'mochawesome',
  reporterOptions: {
  reportDir: 'cypress/reports',
  overwrite: false,
  html: true,
  json: true,
},

});
