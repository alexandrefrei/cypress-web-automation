/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
const CART_TITLE = "span[class='title']";
const CANCEL_BUTTON = '#cancel';
const FINISH_BUTTON = '#finish';

const FIRST_NAME = '#first-name';
const LAST_NAME = '#last-name';
const POSTAL_CODE = '#postal-code';

class CheckoutOverviewPage {
  verifyPageOpened(): void {
    cy.log(`verifyPageOpened  - CheckoutOverview`);
    cy.url().should('include', 'checkout-step-twow');
    cy.get(CART_TITLE).should('have.text', 'Checkout: Overview');
  }

  clickFinish(): void {
    cy.get(FINISH_BUTTON).click();
  }
}

export default new CheckoutOverviewPage();
