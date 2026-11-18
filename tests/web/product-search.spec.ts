/**
 * Test Case: Product Search Flow
 *
 * Tags: @master @sanity @regression
 *
 * Steps:
 * 1) Open the application
 * 2) Enter a valid known product name and submit the search
 * 3) Verify the search results page is displayed
 * 4) Verify the expected product appears and its name matches the search criteria
 */

// using custom fixtures
import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

test('Product Search @master @sanity @regression @web', async ({ homePage, searchResultsPage }) => {
    const product = Helper.getProductDetails();

    await test.step('1) Open the application', async () => {
        expect(await homePage.isHomePageExists()).toBeTruthy();
    });

    await test.step('2) Enter a valid known product name and submit the search', async () => {
        await homePage.searchProduct(product.productName);
    });

    await test.step('3) Verify the search results page is displayed', async () => {
        expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();
    });

    await test.step('4) Verify the expected product appears and its name matches the search criteria', async () => {
        expect(await searchResultsPage.isProductDisplayed(product.productName)).toBeTruthy();
    });

    console.log('✅ Product Search completed successfully!');
});
