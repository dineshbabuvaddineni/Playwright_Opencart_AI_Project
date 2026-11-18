/**
 * Test Case: Invalid Login Flow
 *
 * Tags: @master @regression
 *
 * Steps:
 * 1) Open the application
 * 2) Navigate to My Account -> Login
 * 3) Enter invalid credentials and submit
 * 4) Verify authentication fails
 * 5) Verify the warning message is displayed
 */

// using custom fixtures
import { test, expect } from '../../fixtures/pageFixtures';

test('Invalid Login @master @regression @web', async ({ homePage, loginPage, myAccountPage }) => {
    const email = 'invalid.user@example.com';
    const password = 'wrongPassword';

    await test.step('1) Open the application', async () => {
        expect(await homePage.isHomePageExists()).toBeTruthy();
    });

    await test.step('2) Navigate to My Account -> Login', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogin();
        expect(await loginPage.isLoginPageExists()).toBeTruthy();
    });

    await test.step('3) Enter invalid credentials and submit', async () => {
        await loginPage.login(email, password);
    });

    await test.step('4) Verify authentication fails', async () => {
        expect(await myAccountPage.isMyAccountPageExists()).toBeFalsy();
    });

    await test.step('5) Verify the warning message is displayed', async () => {
        expect(await loginPage.isLoginWarningVisible()).toBeTruthy();
        const warning = await loginPage.getLoginWarning();
        expect(warning).toMatch(/No match for E-Mail Address and\/or Password|exceeded allowed number of login attempts/);
    });

    console.log('✅ Invalid Login validation completed successfully!');
});
