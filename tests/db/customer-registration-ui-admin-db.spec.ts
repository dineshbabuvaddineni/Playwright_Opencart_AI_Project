/**
 * Test Case: OpenCart UI + Admin + MySQL End-to-End Customer Validation
 *
 * Tags: @master @regression @db @end-to-end
 *
 * Steps:
 * 1) Register a customer through the frontend
 * 2) Verify the customer in the Admin portal
 * 3) Verify the customer in the MySQL database
 */

import { test, expect } from '../../fixtures/pageFixtures';
import dotenv from 'dotenv';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { executeQuery } from '../../utils/dbClient';

dotenv.config();

test('Register customer and validate across UI, Admin and DB @master @regression @db @e2e', async ({
    homePage,
    registrationPage,
    adminLoginPage,
    adminCustomersPage,
}) => {
    const firstName = RandomDataUtil.getFirstName();
    const lastName = RandomDataUtil.getLastName();
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Date.now()}@example.com`;
    const telephone = RandomDataUtil.getPhoneNumber();
    const password = RandomDataUtil.getPassword(10);

    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin';

    await test.step('1) Register a customer through the frontend', async () => {
        expect(await homePage.isHomePageExists()).toBeTruthy();

        await homePage.clickMyAccount();
        await homePage.clickRegister();
        expect(await registrationPage.isRegistrationPageExists()).toBeTruthy();

        await registrationPage.register({ firstName, lastName, email, telephone, password });
        expect(await registrationPage.isRegistrationSuccess()).toBeTruthy();
    });

    await test.step('2) Verify the customer in the Admin portal', async () => {
        await adminLoginPage.open();
        expect(await adminLoginPage.isLoginPageExists()).toBeTruthy();

        await adminLoginPage.login(adminUsername, adminPassword);
        await adminCustomersPage.openCustomers();
        await adminCustomersPage.searchByEmail(email);

        expect(await adminCustomersPage.isCustomerDisplayed(firstName, lastName, email)).toBeTruthy();
        expect(await adminCustomersPage.isCustomerEnabled()).toBeTruthy();
    });

    await test.step('3) Verify the customer in the MySQL database', async () => {
        const [rows] = await executeQuery(
            'SELECT firstname, lastname, email, status, date_added FROM oc_customer WHERE email = ?',
            [email],
        );

        expect(Array.isArray(rows)).toBeTruthy();
        expect(rows.length).toBe(1);

        const customer = rows[0];

        expect(customer.firstname).toBe(firstName);
        expect(customer.lastname).toBe(lastName);
        expect(customer.email).toBe(email);
        expect(customer.status).toBe(1);
        expect(customer.date_added).toBeTruthy();
    });

    console.log('✅ Customer validated across UI, Admin, and MySQL successfully!');
});
