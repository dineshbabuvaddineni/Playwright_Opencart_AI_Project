/**
 * Test Case: Login Flow (Data Driven using External File)
 *
 * Tags: @master @datadriven @regression
 *
 * Steps:
 * 1) Open the login page
 * 2) Enter the email and password from the data row (leaving blank values empty)
 * 3) Submit the login form
 * 4) Validate the login result based on the expected value
 */

// using custom fixtures
import { test, expect } from '../../fixtures/pageFixtures';
import { DataProvider } from '../../utils/DataReader';
import { Helper } from '../../utils/helper';

interface LoginRow {
    testName: string;
    email: string;
    password: string;
    expected: string;
}

const loginData = DataProvider.readJson('testdata/opencart_logindata.json') as LoginRow[];

loginData.forEach((row, index) => {
    const scenario = row.testName || 'Login';
    const { email, password } = row.expected === 'success'
        ? Helper.getLoginDetails()
        : { email: row.email, password: row.password };

    test(`Login (Data Driven) - ${scenario} - Row ${index + 1} @master @datadriven @regression @web`, async ({
        homePage,
        loginPage,
        myAccountPage,
    }) => {
        await test.step('1) Open the login page', async () => {
            await homePage.clickMyAccount();
            await homePage.clickLogin();
            expect(await loginPage.isLoginPageExists()).toBeTruthy();
        });

        await test.step('2) Enter the email and password, leaving blank values empty, and submit', async () => {
            await loginPage.loginConditionally(email, password);
        });

        await test.step('3) Validate the login result', async () => {
            if (row.expected === 'success') {
                expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
            } else {
                expect(await myAccountPage.isMyAccountPageExists()).toBeFalsy();
                expect(await loginPage.isLoginWarningVisible()).toBeTruthy();
                const warning = await loginPage.getLoginWarning();
                expect(warning).toMatch(/No match for E-Mail Address and\/or Password|exceeded allowed number of login attempts/);
            }
        });

        console.log(`✅ Data-driven login "${scenario}" row ${index + 1} validated successfully!`);
    });
});
