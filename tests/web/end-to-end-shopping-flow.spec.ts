/**
 * Test Case: End-to-End Shopping Flow
 *
 * Tags: @master @regression @end-to-end
 *
 * Steps:
 * 1) Open the application
 * 2) Register a new customer using dynamically generated unique data
 * 3) Verify successful registration
 * 4) Log out
 * 5) Log in again using the newly created credentials
 * 6) Verify successful authentication
 * 7) Search for a known product
 * 8) Open the product details page
 * 9) Add the product to the cart
 * 10) Open the shopping cart
 * 11) Verify the correct product
 * 12) Verify the quantity
 * 13) Verify the product price
 * 14) Verify the applicable cart total
 * 15) Verify the complete journey finishes without errors
 */

// using custom fixtures
import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { Helper } from '../../utils/helper';

test('End-to-End Shopping Flow @master @regression @e2e @web', async ({
    homePage,
    registrationPage,
    loginPage,
    myAccountPage,
    logoutPage,
    searchResultsPage,
    productPage,
    shoppingCartPage,
}) => {
    const product = Helper.getProductDetails();
    const firstName = RandomDataUtil.getFirstName();
    const lastName = RandomDataUtil.getLastName();
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Date.now()}@example.com`;
    const telephone = RandomDataUtil.getPhoneNumber();
    const password = RandomDataUtil.getPassword(10);

    await test.step('1) Open the application', async () => {
        expect(await homePage.isHomePageExists()).toBeTruthy();
    });

    await test.step('2) Register a new customer', async () => {
        await homePage.clickMyAccount();
        await homePage.clickRegister();
        expect(await registrationPage.isRegistrationPageExists()).toBeTruthy();
        await registrationPage.register({ firstName, lastName, email, telephone, password });
    });

    await test.step('3) Verify successful registration', async () => {
        expect(await registrationPage.isRegistrationSuccess()).toBeTruthy();
    });

    await test.step('4) Log out', async () => {
        await homePage.clickLogout();
        expect(await logoutPage.isLogoutPageExists()).toBeTruthy();
        await logoutPage.clickContinue();
    });

    await test.step('5) Log in again using the newly created credentials', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogin();
        expect(await loginPage.isLoginPageExists()).toBeTruthy();
        await loginPage.login(email, password);
    });

    await test.step('6) Verify successful authentication', async () => {
        expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
    });

    await test.step('7) Search for a known product', async () => {
        await homePage.searchProduct(product.productName);
        expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();
    });

    await test.step('8) Open the product details page', async () => {
        await searchResultsPage.openProduct(product.productName);
        expect(await productPage.isProductPageExists()).toBeTruthy();
    });

    await test.step('9) Add the product to the cart', async () => {
        await productPage.setQuantity(product.productQuantity);
        await productPage.addToCart();
        expect(await productPage.isAddToCartSuccess()).toBeTruthy();
    });

    await test.step('10) Open the shopping cart', async () => {
        await homePage.clickShoppingCart();
        expect(await shoppingCartPage.isCartPageExists()).toBeTruthy();
    });

    await test.step('11) Verify the correct product', async () => {
        expect(await shoppingCartPage.isProductInCart(product.productName)).toBeTruthy();
    });

    await test.step('12) Verify the quantity', async () => {
        expect(await shoppingCartPage.getQuantity()).toBe(product.productQuantity);
    });

    await test.step('13) Verify the product price', async () => {
        expect(await shoppingCartPage.getUnitPrice()).toBe(product.totalPrice);
    });

    await test.step('14) Verify the applicable cart total', async () => {
        expect(await shoppingCartPage.getTotalPrice()).toBe(product.totalPrice);
    });

    await test.step('15) Verify the complete journey finishes without errors', async () => {
        expect(await shoppingCartPage.isCartPageExists()).toBeTruthy();
    });

    console.log('✅ End-to-End Shopping Flow completed successfully!');
});
