import { Page, Locator } from '@playwright/test';

export class AdminLoginPage {
    private readonly page: Page;

    // Locators
    private readonly txtUsername: Locator;
    private readonly txtPassword: Locator;
    private readonly btnLogin: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.txtUsername = page.locator('#input-username');
        this.txtPassword = page.locator('#input-password');
        this.btnLogin = page.locator('button[type="submit"]');
    }

    /**
     * Opens the OpenCart admin login page
     */
    async open(): Promise<void> {
        const adminUrl = process.env.ADMIN_APP_URL || 'http://localhost/opencart/upload/admin/index.php';
        await this.page.goto(adminUrl);
    }

    /**
     * Verifies the admin login page is displayed
     * @returns Promise<boolean> - true if the username field is visible
     */
    async isLoginPageExists(): Promise<boolean> {
        try {
            return await this.txtUsername.isVisible();
        } catch (error) {
            console.log(`Error checking admin login page: ${error}`);
            return false;
        }
    }

    /**
     * Logs in to the admin portal
     * @param username - Administrator username
     * @param password - Administrator password
     */
    async login(username: string, password: string): Promise<void> {
        await this.txtUsername.fill(username);
        await this.txtPassword.fill(password);
        await this.btnLogin.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
}
