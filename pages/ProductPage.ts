import { Page, Locator } from '@playwright/test';

export class ProductPage {
    private readonly page: Page;

    // Locators
    private readonly headingProduct: Locator;
    private readonly txtQuantity: Locator;
    private readonly btnAddToCart: Locator;
    private readonly successAlert: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.headingProduct = page.locator('#content h1');
        this.txtQuantity = page.locator('#input-quantity');
        this.btnAddToCart = page.locator('#button-cart');
        this.successAlert = page.getByText(/Success: You have added .* to your shopping cart!/);
    }

    /**
     * Verifies the product details page is displayed
     * @returns Promise<boolean> - true if the product heading is visible
     */
    async isProductPageExists(): Promise<boolean> {
        try {
            await this.headingProduct.waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch (error) {
            console.log(`Error checking product page: ${error}`);
            return false;
        }
    }

    /**
     * Sets the product quantity
     * @param quantity - Quantity to set
     */
    async setQuantity(quantity: string): Promise<void> {
        await this.txtQuantity.fill(quantity);
    }

    /**
     * Clicks the Add to Cart button
     */
    async addToCart(): Promise<void> {
        await this.btnAddToCart.click();
    }

    /**
     * Verifies the add-to-cart success message is displayed
     * @returns Promise<boolean> - true if the success alert is visible
     */
    async isAddToCartSuccess(): Promise<boolean> {
        try {
            await this.successAlert.waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch (error) {
            console.log(`Error checking add to cart success: ${error}`);
            return false;
        }
    }
}
