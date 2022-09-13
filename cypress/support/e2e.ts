// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands/commands';
import '@shelex/cypress-allure-plugin';
//import 'cypress-mochawesome-reporter/register';

// Alternatively you can use CommonJS syntax:
// require('./commands')

before(() => {
  cy.log('Global Before Hook');
  setUpRoutes();

  cy.visit('', { retryOnStatusCodeFailure: true });
});

function setUpRoutes() {
  cy.log('setting up routes watcher');

  //cy.intercept("GET", "/a/api/investment/*/investor").as("investmentInvestor");
}

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

Cypress.on('fail', (error, runnable) => {
  // eslint-disable-next-line no-debugger
  debugger;
  // we now have access to the err instance
  // and the mocha runnable this failed on

  throw error; // throw error to have test still fail
});
