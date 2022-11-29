export class DB {
  static getUser(): Cypress.Chainable<Promise> {
    cy.log(`getUser`);
    const stringQuery = `SELECT * FROM User;`;
    return cy.task('queryDb', stringQuery);
  }
}
