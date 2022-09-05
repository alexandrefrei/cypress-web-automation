import {
  generateFirstName,
  generateLastName,
  generatePostalCode,
} from '../utils/TextGenerator';

const CART_TITLE = "span[class='title']";
const CANCEL_BUTTON = '#cancel';
const CONTINUE_BUTTON = '#continue';

const FIRST_NAME = '#first-name';
const LAST_NAME = '#last-name';
const POSTAL_CODE = '#postal-code';

class CheckoutPage {
  verifyPageOpened(): void {
    cy.log(`verifyPageOpened  - CheckoutPage`);
    cy.url().should('include', 'checkout-step-one');
    cy.get(CART_TITLE).should('have.text', 'Checkout: Your Information');
  }

  clickContinue(): void {
    cy.get(CONTINUE_BUTTON).click();
  }

  fillInformation(): void {
    cy.get(FIRST_NAME).clear().type(generateFirstName());
    cy.get(LAST_NAME).clear().type(generateLastName());
    cy.get(POSTAL_CODE).clear().type(generatePostalCode());
  }
}

export const checkoutPage = new CheckoutPage();
