/**
 * Test Case: Add Product to Cart
 *
 * Tags: @master @sanity @regression
 *
 * Steps:
 * 1) Open the application
 * 2) Search for a valid known product
 * 3) Open the product details page
 * 4) Set the required quantity and click Add to Cart
 * 5) Verify the product-added confirmation message
 * 6) Open the shopping cart
 * 7) Verify the selected product is present
 * 8) Verify the displayed quantity matches the requested quantity
 */

// using custom fixtures
import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

test('Add Product to Cart @master @sanity @regression @web', async ({
    homePage,
    searchResultsPage,
    productPage,
    shoppingCartPage,
}) => {
    const product = Helper.getProductDetails();
    const quantity = '2';

    await test.step('1) Open the application', async () => {
        expect(await homePage.isHomePageExists()).toBeTruthy();
    });

    await test.step('2) Search for a valid known product', async () => {
        await homePage.searchProduct(product.productName);
        expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();
    });

    await test.step('3) Open the product details page', async () => {
        await searchResultsPage.openProduct(product.productName);
        expect(await productPage.isProductPageExists()).toBeTruthy();
    });

    await test.step('4) Set the required quantity and click Add to Cart', async () => {
        await productPage.setQuantity(quantity);
        await productPage.addToCart();
    });

    await test.step('5) Verify the product-added confirmation message', async () => {
        expect(await productPage.isAddToCartSuccess()).toBeTruthy();
    });

    await test.step('6) Open the shopping cart', async () => {
        await homePage.clickShoppingCart();
        expect(await shoppingCartPage.isCartPageExists()).toBeTruthy();
    });

    await test.step('7) Verify the selected product is present', async () => {
        expect(await shoppingCartPage.isProductInCart(product.productName)).toBeTruthy();
    });

    await test.step('8) Verify the displayed quantity matches the requested quantity', async () => {
        expect(await shoppingCartPage.getQuantity()).toBe(quantity);
    });

    console.log('✅ Add Product to Cart completed successfully!');
});
