/**
 * Test Case: Valid Login Flow
 *
 * Tags: @master @sanity @regression
 *
 * Steps:
 * 1) Open the application
 * 2) Navigate to My Account -> Login
 * 3) Verify the login page is displayed
 * 4) Enter valid customer credentials and submit
 * 5) Verify successful authentication
 * 6) Verify the authenticated My Account area is displayed
 */

// using custom fixtures
import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

test('Valid Login @master @sanity @regression @web', async ({ homePage, loginPage, myAccountPage }) => {
    const { email, password } = Helper.getLoginDetails();

    await test.step('1) Open the application', async () => {
        expect(await homePage.isHomePageExists()).toBeTruthy();
    });

    await test.step('2) Navigate to My Account -> Login', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogin();
    });

    await test.step('3) Verify the login page is displayed', async () => {
        expect(await loginPage.isLoginPageExists()).toBeTruthy();
    });

    await test.step('4) Enter valid customer credentials and submit', async () => {
        await loginPage.login(email, password);
    });

    await test.step('5) Verify successful authentication', async () => {
        expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
    });

    await test.step('6) Verify the authenticated My Account area is displayed', async () => {
        expect(await homePage.isLogoutLinkVisible()).toBeTruthy();
    });

    console.log('✅ Valid Login completed successfully!');
});
