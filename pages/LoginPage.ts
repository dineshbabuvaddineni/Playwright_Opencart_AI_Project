import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;

    // Locators
    private readonly txtEmail: Locator;
    private readonly txtPassword: Locator;
    private readonly btnLogin: Locator;
    private readonly alertDanger: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.txtEmail = page.locator('#input-email');
        this.txtPassword = page.locator('#input-password');
        this.btnLogin = page.locator('input[type="submit"][value="Login"]');
        this.alertDanger = page.locator('.alert-danger');
    }

    /**
     * Verifies the login page is displayed
     * @returns Promise<boolean> - true if the email field is visible
     */
    async isLoginPageExists(): Promise<boolean> {
        try {
            await this.txtEmail.waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch (error) {
            console.log(`Error checking login page: ${error}`);
            return false;
        }
    }

    /**
     * Logs in a customer
     * @param email - Customer email address
     * @param password - Customer password
     */
    async login(email: string, password: string): Promise<void> {
        try {
            await this.txtEmail.fill(email);
            await this.txtPassword.fill(password);
            await this.btnLogin.click();
        } catch (error) {
            console.log(`Error logging in: ${error}`);
            throw error;
        }
    }

    /**
     * Logs in a customer leaving blank/whitespace fields empty
     * @param email - Customer email address
     * @param password - Customer password
     */
    async loginConditionally(email: string, password: string): Promise<void> {
        try {
            if (email.trim() !== '') {
                await this.txtEmail.fill(email);
            }
            if (password.trim() !== '') {
                await this.txtPassword.fill(password);
            }
            await this.btnLogin.click();
        } catch (error) {
            console.log(`Error logging in: ${error}`);
            throw error;
        }
    }

    /**
     * Verifies the login warning message is displayed
     * @returns Promise<boolean> - true if the warning is visible
     */
    async isLoginWarningVisible(): Promise<boolean> {
        try {
            await this.alertDanger.waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch (error) {
            console.log(`Error checking login warning: ${error}`);
            return false;
        }
    }

    /**
     * Gets the login warning message text
     * @returns Promise<string> - Warning message text
     */
    async getLoginWarning(): Promise<string> {
        try {
            return (await this.alertDanger.innerText()).trim();
        } catch (error) {
            console.log(`Error getting login warning: ${error}`);
            return '';
        }
    }
}
