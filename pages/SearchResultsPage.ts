import { Page, Locator } from '@playwright/test';
import { ProductPage } from './ProductPage';

export class SearchResultsPage {
    private readonly page: Page;

    // Locators
    private readonly headingSearch: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.headingSearch = page.locator('#content h1');
    }

    /**
     * Verifies the search results page is displayed
     * @returns Promise<boolean> - true if the search heading is visible
     */
    async isSearchResultsPageExists(): Promise<boolean> {
        try {
            await this.headingSearch.waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch (error) {
            console.log(`Error checking search results page: ${error}`);
            return false;
        }
    }

    /**
     * Opens a product details page from the search results
     * @param productName - Exact product name to open
     * @returns Promise<ProductPage> - Instance of the product page
     */
    async openProduct(productName: string): Promise<ProductPage> {
        const productLink = this.page.getByRole('link', { name: productName, exact: true }).first();
        await productLink.click();
        return new ProductPage(this.page);
    }

    /**
     * Verifies a product appears in the search results
     * @param productName - Expected product name
     * @returns Promise<boolean> - true if the product link is visible
     */
    async isProductDisplayed(productName: string): Promise<boolean> {
        try {
            const productLink = this.page.getByRole('link', { name: productName, exact: true }).first();
            return await productLink.isVisible();
        } catch (error) {
            console.log(`Error checking product displayed: ${error}`);
            return false;
        }
    }
}
