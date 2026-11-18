import { Page, Locator } from '@playwright/test';
import { HomePage } from './HomePage';

export class LogoutPage {
    private readonly page: Page;

    // Locators
    private readonly headingAccountLogout: Locator;
    private readonly lnkContinue: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.headingAccountLogout = page.getByRole('heading', { name: 'Account Logout' });
        this.lnkContinue = page.getByRole('link', { name: 'Continue' });
    }

    /**
     * Verifies the logout page is displayed
     * @returns Promise<boolean> - true if the logout heading is visible
     */
    async isLogoutPageExists(): Promise<boolean> {
        try {
            await this.headingAccountLogout.waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch (error) {
            console.log(`Error checking logout page: ${error}`);
            return false;
        }
    }

    /**
     * Clicks Continue and returns the home page
     * @returns Promise<HomePage> - Instance of the home page
     */
    async clickContinue(): Promise<HomePage> {
        await this.lnkContinue.click();
        return new HomePage(this.page);
    }
}
