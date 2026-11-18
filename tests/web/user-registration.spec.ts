/**
 * Test Case: User Registration Flow
 *
 * Tags: @master @sanity @regression
 *
 * Steps:
 * 1) Open the application
 * 2) Navigate to My Account -> Register
 * 3) Verify the registration page is displayed
 * 4) Generate a unique customer email
 * 5) Enter valid customer details, accept the Privacy Policy, and submit
 * 6) Verify the "Your Account Has Been Created!" confirmation
 * 7) Verify the account is available through the account navigation
 */

// using custom fixtures
import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';

test('User Registration @master @sanity @regression @web', async ({ homePage, registrationPage }) => {
    const firstName = RandomDataUtil.getFirstName();
    const lastName = RandomDataUtil.getLastName();
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Date.now()}@example.com`;
    const telephone = RandomDataUtil.getPhoneNumber();
    const password = RandomDataUtil.getPassword(10);

    await test.step('1) Open the application', async () => {
        expect(await homePage.isHomePageExists()).toBeTruthy();
    });

    await test.step('2) Navigate to My Account -> Register', async () => {
        await homePage.clickMyAccount();
        await homePage.clickRegister();
    });

    await test.step('3) Verify the registration page is displayed', async () => {
        expect(await registrationPage.isRegistrationPageExists()).toBeTruthy();
    });

    await test.step('4) Generate a unique customer email', async () => {
        expect(email).toContain('@example.com');
    });

    await test.step('5) Enter valid customer details, accept the Privacy Policy, and submit', async () => {
        await registrationPage.register({ firstName, lastName, email, telephone, password });
    });

    await test.step('6) Verify the "Your Account Has Been Created!" confirmation', async () => {
        expect(await registrationPage.isRegistrationSuccess()).toBeTruthy();
    });

    await test.step('7) Verify the account is available through the account navigation', async () => {
        expect(await homePage.isLogoutLinkVisible()).toBeTruthy();
    });

    console.log('✅ User Registration completed successfully!');
});
