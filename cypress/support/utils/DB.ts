export class DB {
  static getUser() {
    cy.log(`getUser`);
    const stringQuery = `SELECT * FROM User;`;
    cy.task('queryDatabase', stringQuery).then((result) => {
      cy.log('Row Validation');
      expect(result[0].Name).to.equal('John');
    });

    //cy.task("queryDb", stringQuery );
  }
}
