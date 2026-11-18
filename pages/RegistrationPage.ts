import { Page, Locator } from '@playwright/test';

export interface RegistrationData {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    password: string;
}

export class RegistrationPage {
    private readonly page: Page;

    // Locators
    private readonly txtFirstName: Locator;
    private readonly txtLastName: Locator;
    private readonly txtEmail: Locator;
    private readonly txtTelephone: Locator;
    private readonly txtPassword: Locator;
    private readonly txtConfirm: Locator;
    private readonly chkAgree: Locator;
    private readonly btnContinue: Locator;
    private readonly successHeading: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.txtFirstName = page.locator('#input-firstname');
        this.txtLastName = page.locator('#input-lastname');
        this.txtEmail = page.locator('#input-email');
        this.txtTelephone = page.locator('#input-telephone');
        this.txtPassword = page.locator('#input-password');
        this.txtConfirm = page.locator('#input-confirm');
        this.chkAgree = page.locator('input[name="agree"]');
        this.btnContinue = page.locator('input[type="submit"][value="Continue"]');
        this.successHeading = page.getByRole('heading', { name: 'Your Account Has Been Created!' });
    }

    /**
     * Verifies the registration page is displayed
     * @returns Promise<boolean> - true if the first name field is visible
     */
    async isRegistrationPageExists(): Promise<boolean> {
        try {
            await this.txtFirstName.waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch (error) {
            console.log(`Error checking registration page: ${error}`);
            return false;
        }
    }

    /**
     * Registers a new customer
     * @param data - Registration data to submit
     */
    async register(data: RegistrationData): Promise<void> {
        try {
            await this.txtFirstName.fill(data.firstName);
            await this.txtLastName.fill(data.lastName);
            await this.txtEmail.fill(data.email);
            await this.txtTelephone.fill(data.telephone);
            await this.txtPassword.fill(data.password);
            await this.txtConfirm.fill(data.password);
            await this.chkAgree.check();
            await this.btnContinue.click();
        } catch (error) {
            console.log(`Error registering customer: ${error}`);
            throw error;
        }
    }

    /**
     * Verifies the registration success message is displayed
     * @returns Promise<boolean> - true if the success heading is visible
     */
    async isRegistrationSuccess(): Promise<boolean> {
        try {
            return await this.successHeading.isVisible();
        } catch (error) {
            console.log(`Error checking registration success: ${error}`);
            return false;
        }
    }
}
