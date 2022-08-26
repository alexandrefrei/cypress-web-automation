// in cypress/support/index.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />


declare namespace Cypress {
    interface Chainable {
    /**
     * Custom command to perform a login
     * @example cy.login("Admin", "Password");
     */
    login(user: string, password: string): Chainable<Element>
    }
}
  