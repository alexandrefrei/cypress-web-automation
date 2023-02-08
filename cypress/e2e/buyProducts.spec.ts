import { USER, PASSWORD } from '../support/utils/config';
import CartPage from '../support/pageObjects/cartPage';
import { checkoutCompletePage } from '../support/pageObjects/checkoutCompletePage';
import CheckoutOverviewPage from '../support/pageObjects/checkoutOverviewPage';
import { checkoutPage } from '../support/pageObjects/checkoutPage';
import { homePage } from '../support/pageObjects/homePage';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { userData } from '../support/dataObjects/userData';

/*In this project we are using two different ways to export the PageObject classes
 * The first one we use the named export:     export const homePage = new HomePage();
 * The second one we use the default export:  export default new CartPage();
 * There is no right way to use the export, just different ways to do the same thing
 */

describe('Purchase Products', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let productArray: string[];
  before(() => {
    cy.login(USER, PASSWORD);
  });
  //it('Purchase All T-Shirts', ['@smoke', '@buyProduct'] () => { This way we can add multiple tags
  it('Purchase All T-Shirts', { tags: '@smoke' }, () => {
    homePage.verifyPageOpened();
    //const listProducts = ["Sauce Labs Bolt T-Shirt", "Test.allTheThings() T-Shirt (Red)"];
    //homePage.selectProductsByName(listProducts);
    productArray = homePage.selectAllTShirt();
    //homePage.numberOfProductAtCart(productArray.length.toString());

    homePage.clickAtCart();

    //Here is the way to get data from Database
    //userData.verifyUserData();

    //Here is a different way where we can use Page Object. All the actions are done in the spec file
    //homePage.getCartButton().click();
    //homePage.getNumberOfProduct().should('have.text', 4);

    CartPage.verifyPageOpened();
    CartPage.clickCheckout();

    checkoutPage.verifyPageOpened();
    checkoutPage.fillInformation();
    checkoutPage.clickContinue();

    CheckoutOverviewPage.verifyPageOpened();
    CheckoutOverviewPage.clickFinish();

    checkoutCompletePage.verifyPageOpened();
    checkoutCompletePage.verifyFinalMessage();
    checkoutCompletePage.verifyOrderDispatched();
  });
});
