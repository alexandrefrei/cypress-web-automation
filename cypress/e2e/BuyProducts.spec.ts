import { USER, PASSWORD } from '../support/utils/config';
import { cartPage } from 'cypress/support/pageObjects/CartPage';
import { checkoutCompletePage } from 'cypress/support/pageObjects/CheckoutCompletePage';
import { checkoutOverviewPage } from 'cypress/support/pageObjects/CheckoutOverviewPage';
import { checkoutPage } from 'cypress/support/pageObjects/CheckoutPage';
import { homePage } from 'cypress/support/pageObjects/HomePage';

describe('Purchase Products', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let productArray: string[];
  before(() => {
    cy.login(USER, PASSWORD);
  });

  it('Purchase All T-Shirts', () => {
    homePage.verifyPageOpened();
    //const listProducts = ["Sauce Labs Bolt T-Shirt", "Test.allTheThings() T-Shirt (Red)"];
    //homePage.selectProductsByName(listProducts);
    productArray = homePage.selectAllTShirt();
    //homePage.numberOfProductAtCart(productArray.length.toString());
    homePage.clickAtCart();

    cartPage.verifyPageOpened();
    cartPage.clickCheckout();

    checkoutPage.verifyPageOpened();
    checkoutPage.fillInformation();
    checkoutPage.clickContinue();

    checkoutOverviewPage.verifyPageOpened();
    checkoutOverviewPage.clickFinish();

    checkoutCompletePage.verifyPageOpened();
    checkoutCompletePage.verifyFinalMessage();
    checkoutCompletePage.verifyOrderDispatched();
  });
});
