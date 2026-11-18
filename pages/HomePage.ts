import { Page, Locator } from '@playwright/test';
import { RegistrationPage } from './RegistrationPage';
import { LoginPage } from './LoginPage';
import { LogoutPage } from './LogoutPage';
import { SearchResultsPage } from './SearchResultsPage';
import { ShoppingCartPage } from './ShoppingCartPage';

export class HomePage {
    private readonly page: Page;

    // Locators
    private readonly lnkMyAccount: Locator;
    private readonly lnkRegister: Locator;
    private readonly lnkLogin: Locator;
    private readonly lnkLogout: Locator;
    private readonly lnkShoppingCart: Locator;
    private readonly txtSearch: Locator;
    private readonly btnSearch: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.lnkMyAccount = page.getByRole('link', { name: 'My Account' }).first();
        this.lnkRegister = page.getByRole('link', { name: 'Register' }).first();
        this.lnkLogin = page.getByRole('link', { name: 'Login' }).first();
        this.lnkLogout = page.getByRole('link', { name: 'Logout' }).first();
        this.lnkShoppingCart = page.getByRole('link', { name: 'Shopping Cart' }).first();
        this.txtSearch = page.locator('input[name="search"]');
        this.btnSearch = page.locator('#search button');
    }

    /**
     * Verifies the home page is displayed
     * @returns Promise<boolean> - true if the search box is visible
     */
    async isHomePageExists(): Promise<boolean> {
        try {
            await this.txtSearch.waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch (error) {
            console.log(`Error checking home page: ${error}`);
            return false;
        }
    }

    /**
     * Clicks the My Account navigation link
     */
    async clickMyAccount(): Promise<void> {
        await this.lnkMyAccount.click();
    }

    /**
     * Clicks the Register link and returns the registration page
     * @returns Promise<RegistrationPage> - Instance of the registration page
     */
    async clickRegister(): Promise<RegistrationPage> {
        await this.lnkRegister.click();
        return new RegistrationPage(this.page);
    }

    /**
     * Clicks the Login link and returns the login page
     * @returns Promise<LoginPage> - Instance of the login page
     */
    async clickLogin(): Promise<LoginPage> {
        await this.lnkLogin.click();
        return new LoginPage(this.page);
    }

    /**
     * Clicks the Logout link and returns the logout page
     * @returns Promise<LogoutPage> - Instance of the logout page
     */
    async clickLogout(): Promise<LogoutPage> {
        await this.lnkLogout.click();
        return new LogoutPage(this.page);
    }

    /**
     * Verifies the logout link is available
     * @returns Promise<boolean> - true if the logout link is visible
     */
    async isLogoutLinkVisible(): Promise<boolean> {
        try {
            return await this.lnkLogout.isVisible();
        } catch (error) {
            console.log(`Error checking logout link: ${error}`);
            return false;
        }
    }

    /**
     * Clicks the Shopping Cart link and returns the cart page
     * @returns Promise<ShoppingCartPage> - Instance of the cart page
     */
    async clickShoppingCart(): Promise<ShoppingCartPage> {
        await this.lnkShoppingCart.click();
        return new ShoppingCartPage(this.page);
    }

    /**
     * Searches for a product
     * @param productName - Name of the product to search
     * @returns Promise<SearchResultsPage> - Instance of the search results page
     */
    async searchProduct(productName: string): Promise<SearchResultsPage> {
        await this.txtSearch.fill(productName);
        await this.btnSearch.click();
        return new SearchResultsPage(this.page);
    }
}
