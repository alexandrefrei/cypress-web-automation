const HOME_LABEL_PRODUCTS = "span[class='title']";
const ADD_CART_BUTTON =
  "button[class='btn btn_primary btn_small btn_inventory']";
const PRODUCT_NAME = "div[class='inventory_item_name']";
const NUMBER_OF_PRODUCTS = "span[class='shopping_cart_badge']";
const BUTTON_CART = '#shopping_cart_container';

class HomePage {
  verifyPageOpened(): void {
    cy.log(`verifyPageOpened  - HomePage`);
    cy.title().should('equal', 'Swag Labs');
    cy.url().should('include', 'inventory');
    cy.get(HOME_LABEL_PRODUCTS).should('have.text', 'Products');
  }

  numberOfProductAtCart(value: string): void {
    cy.get(NUMBER_OF_PRODUCTS).should('have.text', value);
  }
  clickAtCart(): void {
    cy.get(BUTTON_CART).click();
  }

  selectAllTShirt(): string[] {
    const productArray: string[] = [];

    cy.get(PRODUCT_NAME)
      .filter(`:contains("T-Shirt")`)
      .each((item) => {
        productArray[0] = 'TESTE';
        cy.wrap(item)
          .parent('a')
          .parent('div')
          .parent('div')
          .within(() => {
            cy.get(ADD_CART_BUTTON).click().debug;
            //cy.get(ADD_CART_BUTTON).should("have.text","Remove");
            //cy.log(item.text().toString()).debug();
            //var value = item.text().toString();
            //cy.log("Here is the value: "+value);
            //productArray[0] = "TESTE";
          });
      });
    cy.log('First value: ' + productArray[0]);
    return productArray;
  }

  selectAllTShirtII(): void {
    cy.get(PRODUCT_NAME).each((elem) => {
      if (elem.text().includes('T-Shirt')) {
        cy.wrap(elem)
          .parent('a')
          .parent('div')
          .parent('div')
          .within(() => {
            cy.get(ADD_CART_BUTTON).click();
          });
      }
    });
  }
  selectProductsByName(products: string[]): void {
    products.forEach((productName) => {
      cy.get(PRODUCT_NAME)
        .filter(`:contains("${productName}")`)
        .parent('a')
        .parent('div')
        .parent('div')
        .within(() => {
          cy.get(ADD_CART_BUTTON).click();
        });
    });
  }
  selectProductsByNameII(products: string[]): void {
    products.forEach((productName) => {
      cy.get(PRODUCT_NAME).each((elem) => {
        if (elem.text().includes(productName)) {
          cy.wrap(elem)
            .parent('a')
            .parent('div')
            .parent('div')
            .within(() => {
              cy.get(ADD_CART_BUTTON).click();
            });
        }
      });
    });
  }
}

export const homePage = new HomePage();
