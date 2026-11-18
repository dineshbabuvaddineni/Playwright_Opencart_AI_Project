import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { Routes } from '../../api/endpoints/routes';
import { SchemaValidator } from '../../utils/SchemaValidator';

dotenv.config();

test.describe('JSON Schema Validation API Tests', () => {

    // ---------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------

    const BASE_URL = Routes.BASE_URL;
    const PRODUCT_ID = Number(process.env.PRODUCT_ID ?? 1);
    const USER_ID = Number(process.env.USER_ID ?? 1);
    const CART_ID = Number(process.env.CART_ID ?? 1);

    // ---------------------------------------------------------
    // Product Response Schema
    // ---------------------------------------------------------

    test('Product Response Schema @master @regression @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_PRODUCT_BY_ID.replace('{id}', String(PRODUCT_ID))}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        const validation = SchemaValidator.validate('./api/schemas/product_api_schema.json', responseBody);

        if (!validation.isValid) {
            console.log('Product schema validation errors:', validation.errors.join('; '));
        }

        expect(validation.isValid).toBeTruthy();
    });

    // ---------------------------------------------------------
    // User Response Schema
    // ---------------------------------------------------------

    test('User Response Schema @master @regression @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_USER_BY_ID.replace('{id}', String(USER_ID))}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        const validation = SchemaValidator.validate('./api/schemas/user_api_schema.json', responseBody);

        if (!validation.isValid) {
            console.log('User schema validation errors:', validation.errors.join('; '));
        }

        expect(validation.isValid).toBeTruthy();
    });

    // ---------------------------------------------------------
    // Cart Response Schema
    // ---------------------------------------------------------

    test('Cart Response Schema @master @regression @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_CART_BY_ID.replace('{id}', String(CART_ID))}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        const validation = SchemaValidator.validate('./api/schemas/cart_api_schema.json', responseBody);

        if (!validation.isValid) {
            console.log('Cart schema validation errors:', validation.errors.join('; '));
        }

        expect(validation.isValid).toBeTruthy();
    });
});
