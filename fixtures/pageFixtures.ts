import { test as base, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { LogoutPage } from '../pages/LogoutPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/ProductPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import { AdminLoginPage } from '../pages/AdminLoginPage';
import { AdminCustomersPage } from '../pages/AdminCustomersPage';

dotenv.config();

const APP_URL = process.env.WEB_APP_URL || 'http://localhost/opencart/upload/';

type PageFixtures = {
    homePage: HomePage;
    registrationPage: RegistrationPage;
    loginPage: LoginPage;
    myAccountPage: MyAccountPage;
    logoutPage: LogoutPage;
    searchResultsPage: SearchResultsPage;
    productPage: ProductPage;
    shoppingCartPage: ShoppingCartPage;
    adminLoginPage: AdminLoginPage;
    adminCustomersPage: AdminCustomersPage;
};

export const test = base.extend<PageFixtures>({
    homePage: async ({ page }, use) => {
        await page.goto(APP_URL);
        await use(new HomePage(page));
    },
    registrationPage: async ({ page }, use) => {
        await use(new RegistrationPage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    myAccountPage: async ({ page }, use) => {
        await use(new MyAccountPage(page));
    },
    logoutPage: async ({ page }, use) => {
        await use(new LogoutPage(page));
    },
    searchResultsPage: async ({ page }, use) => {
        await use(new SearchResultsPage(page));
    },
    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },
    shoppingCartPage: async ({ page }, use) => {
        await use(new ShoppingCartPage(page));
    },
    adminLoginPage: async ({ page }, use) => {
        await use(new AdminLoginPage(page));
    },
    adminCustomersPage: async ({ page }, use) => {
        await use(new AdminCustomersPage(page));
    },
});

test.afterEach(async ({ page }) => {
    if (!page.isClosed()) {
        await page.close();
    }
});

export { expect };
