/* eslint-disable @typescript-eslint/no-unused-vars */
const CART_TITLE = "span[class='title']";
const BACK_BUTTON = '#back-to-products';

const FINAL_MESSAGE = "h2[class='complete-header']";
const ORDER_DISPATCHED = "div[class='complete-text']";
const CONTAINER = '#checkout_complete_container';

class CheckoutCompletePage {
  verifyPageOpened(): void {
    cy.log(`verifyPageOpened  - CheckoutComplete`);
    cy.url().should('include', 'checkout-complete');
    cy.get(CART_TITLE).should('have.text', 'Checkout: Complete!');
    cy.get(CONTAINER).should('be.visible');
  }

  verifyFinalMessage(): void {
    cy.get(FINAL_MESSAGE).should('have.text', 'THANK YOU FOR YOUR ORDER');
  }

  verifyOrderDispatched(): void {
    cy.get(ORDER_DISPATCHED).should(
      'have.text',
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!',
    );
  }
}

export const checkoutCompletePage = new CheckoutCompletePage();
