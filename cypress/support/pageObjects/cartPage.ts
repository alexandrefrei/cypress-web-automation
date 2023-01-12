const CART_TITLE = "span[class='title'";
const CHECKOUT_BUTTON = '#checkout';

class CartPage {
  verifyPageOpened(): void {
    cy.log(`verifyPageOpened  - CartPage`);
    cy.url().should('include', 'cart');
    cy.get(CART_TITLE).should('have.text', 'Your Cart');
  }

  clickCheckout(): void {
    cy.get(CHECKOUT_BUTTON).should("be.visible").click();
  }
}

export default new CartPage();
