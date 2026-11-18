/**
 * Test Case: Logout Flow
 *
 * Tags: @master @regression
 *
 * Steps:
 * 1) Open the application
 * 2) Log in using valid customer credentials
 * 3) Verify authentication succeeds
 * 4) Navigate to the account logout option and click Logout
 * 5) Verify the logout confirmation page is displayed
 * 6) Click Continue
 * 7) Verify the redirect to the homepage
 * 8) Verify authenticated account options are no longer available
 */

// using custom fixtures
import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

test('Logout @master @regression @web', async ({ homePage, loginPage, myAccountPage, logoutPage }) => {
    const { email, password } = Helper.getLoginDetails();

    await test.step('1) Open the application', async () => {
        expect(await homePage.isHomePageExists()).toBeTruthy();
    });

    await test.step('2) Log in using valid customer credentials', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogin();
        expect(await loginPage.isLoginPageExists()).toBeTruthy();
        await loginPage.login(email, password);
    });

    await test.step('3) Verify authentication succeeds', async () => {
        expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
    });

    await test.step('4) Navigate to the account logout option and click Logout', async () => {
        await homePage.clickLogout();
    });

    await test.step('5) Verify the logout confirmation page is displayed', async () => {
        expect(await logoutPage.isLogoutPageExists()).toBeTruthy();
    });

    await test.step('6) Click Continue', async () => {
        await logoutPage.clickContinue();
    });

    await test.step('7) Verify the redirect to the homepage', async () => {
        expect(await homePage.isHomePageExists()).toBeTruthy();
    });

    await test.step('8) Verify authenticated account options are no longer available', async () => {
        expect(await homePage.isLogoutLinkVisible()).toBeFalsy();
    });

    console.log('✅ Logout completed successfully!');
});
