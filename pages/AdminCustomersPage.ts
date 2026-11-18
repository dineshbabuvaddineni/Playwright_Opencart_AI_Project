import { Page, Locator } from '@playwright/test';

export class AdminCustomersPage {
    private readonly page: Page;

    // Locators
    private readonly lnkCustomers: Locator;
    private readonly txtEmail: Locator;
    private readonly btnFilter: Locator;
    private readonly customerTable: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.lnkCustomers = page.locator('a[href*="route=customer/customer"]').first();
        this.txtEmail = page.locator('#input-email');
        this.btnFilter = page.locator('#button-filter');
        this.customerTable = page.locator('table').first();
    }

    /**
     * Opens the Customers section from the admin dashboard
     */
    async openCustomers(): Promise<void> {
        // Close the security notification modal when it is displayed
        const modalClose = this.page.locator('#modal-security .close, #modal-security button.close');
        if (await modalClose.count()) {
            await modalClose.first().click();
            await this.page.locator('#modal-security').waitFor({ state: 'hidden', timeout: 10000 });
        }

        const customersUrl = await this.lnkCustomers.getAttribute('href');
        if (customersUrl) {
            await this.page.goto(customersUrl);
        }
        await this.page.waitForLoadState('domcontentloaded');
    }

    /**
     * Searches for a customer by email address
     * @param email - Customer email address
     */
    async searchByEmail(email: string): Promise<void> {
        await this.txtEmail.fill(email);
        await this.btnFilter.click();
        await this.customerTable.getByText(email).waitFor({ state: 'visible', timeout: 10000 });
    }

    /**
     * Verifies the customer is displayed with the expected details
     * @param firstName - Expected first name
     * @param lastName - Expected last name
     * @param email - Expected email address
     * @returns Promise<boolean> - true if the customer details are visible
     */
    async isCustomerDisplayed(firstName: string, lastName: string, email: string): Promise<boolean> {
        try {
            const text = await this.customerTable.innerText();
            return text.includes(`${firstName} ${lastName}`) && text.includes(email);
        } catch (error) {
            console.log(`Error checking customer in admin: ${error}`);
            return false;
        }
    }

    /**
     * Verifies the customer status is displayed as enabled
     * @returns Promise<boolean> - true if the status text is visible
     */
    async isCustomerEnabled(): Promise<boolean> {
        try {
            const text = await this.customerTable.innerText();
            return text.includes('Enabled');
        } catch (error) {
            console.log(`Error checking customer status in admin: ${error}`);
            return false;
        }
    }
}
