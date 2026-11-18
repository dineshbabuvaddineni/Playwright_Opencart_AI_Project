import { Page, Locator } from '@playwright/test';

export class ShoppingCartPage {
    private readonly page: Page;

    // Locators
    private readonly headingShoppingCart: Locator;
    private readonly itemsTable: Locator;
    private readonly totalsTable: Locator;
    private readonly productLink: Locator;
    private readonly productRow: Locator;
    private readonly quantityInput: Locator;
    private readonly unitPrice: Locator;
    private readonly rowTotal: Locator;
    private readonly totalPrice: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.headingShoppingCart = page.getByRole('heading', { name: 'Shopping Cart' });
        this.itemsTable = page.locator('#content form table.table').first();
        this.totalsTable = page.locator('#content table.table').nth(1);
        this.productLink = this.itemsTable.locator('tbody tr td.text-left a').first();
        this.productRow = this.productLink.locator('..').locator('..');
        this.quantityInput = this.itemsTable.locator('input[name^="quantity"]').first();
        this.unitPrice = this.productRow.locator('td.text-right').nth(0);
        this.rowTotal = this.productRow.locator('td.text-right').nth(1);
        this.totalPrice = this.totalsTable.locator('tbody tr').last().locator('td.text-right').nth(1);
    }

    /**
     * Verifies the shopping cart page is displayed
     * @returns Promise<boolean> - true if the shopping cart heading is visible
     */
    async isCartPageExists(): Promise<boolean> {
        try {
            await this.headingShoppingCart.waitFor({ state: 'visible', timeout: 10000 });
            return true;
        } catch (error) {
            console.log(`Error checking shopping cart page: ${error}`);
            return false;
        }
    }

    /**
     * Gets the product name displayed in the cart
     * @returns Promise<string> - Product name text
     */
    async getProductName(): Promise<string> {
        return (await this.productLink.innerText()).trim();
    }

    /**
     * Gets the product quantity displayed in the cart
     * @returns Promise<string> - Quantity value
     */
    async getQuantity(): Promise<string> {
        return (await this.quantityInput.inputValue()).trim();
    }

    /**
     * Gets the unit price displayed for the product
     * @returns Promise<string> - Unit price text
     */
    async getUnitPrice(): Promise<string> {
        return (await this.unitPrice.innerText()).trim();
    }

    /**
     * Gets the applicable cart total
     * @returns Promise<string> - Cart total text
     */
    async getTotalPrice(): Promise<string> {
        return (await this.totalPrice.innerText()).trim();
    }

    /**
     * Verifies a product is present in the cart
     * @param productName - Expected product name
     * @returns Promise<boolean> - true if the product name is present
     */
    async isProductInCart(productName: string): Promise<boolean> {
        try {
            const name = await this.getProductName();
            return name.includes(productName);
        } catch (error) {
            console.log(`Error checking product in cart: ${error}`);
            return false;
        }
    }
}
