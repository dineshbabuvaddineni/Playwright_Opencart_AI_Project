import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { Routes } from '../../api/endpoints/routes';
import { RandomDataUtil } from '../../utils/dataGenerator';

dotenv.config();

test.describe('Products API Tests', () => {

    // ---------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------

    const BASE_URL = Routes.BASE_URL;
    const PRODUCT_ID = Number(process.env.PRODUCT_ID ?? 1);
    const LIMIT = Number(process.env.LIMIT ?? 3);

    // ---------------------------------------------------------
    // GET - All Products
    // ---------------------------------------------------------

    test('GET - All Products @master @sanity @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_ALL_PRODUCTS}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBeGreaterThan(0);

        for (const product of responseBody) {
            expect(product.id).toBeTruthy();
            expect(product.title).toBeTruthy();
            expect(product.price).toBeTruthy();
            expect(product.category).toBeTruthy();
            expect(product.image).toBeTruthy();
        }
    });

    // ---------------------------------------------------------
    // GET - Product by ID
    // ---------------------------------------------------------

    test('GET - Product by ID @master @sanity @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_PRODUCT_BY_ID.replace('{id}', String(PRODUCT_ID))}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody.id).toBe(PRODUCT_ID);
        expect(responseBody.title).toBeTruthy();
        expect(responseBody.price).toBeTruthy();
        expect(responseBody.category).toBeTruthy();
        expect(responseBody.image).toBeTruthy();
    });

    // ---------------------------------------------------------
    // GET - Products with Limit
    // ---------------------------------------------------------

    test('GET - Products with Limit @master @regression @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_PRODUCTS_WITH_LIMIT.replace('{limit}', String(LIMIT))}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBe(LIMIT);
    });

    // ---------------------------------------------------------
    // GET - Products Sorted Ascending / Descending
    // ---------------------------------------------------------

    test('GET - Products Sorted Ascending @master @regression @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_PRODUCTS_SORTED.replace('{order}', 'asc')}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        const ids = responseBody.map((product: { id: number }) => product.id);
        const sortedIds = [...ids].sort((a, b) => a - b);

        expect(ids).toEqual(sortedIds);
    });

    test('GET - Products Sorted Descending @master @regression @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_PRODUCTS_SORTED.replace('{order}', 'desc')}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        const ids = responseBody.map((product: { id: number }) => product.id);
        const sortedIds = [...ids].sort((a, b) => b - a);

        expect(ids).toEqual(sortedIds);
    });

    // ---------------------------------------------------------
    // GET - All Product Categories
    // ---------------------------------------------------------

    test('GET - All Product Categories @master @sanity @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_ALL_CATEGORIES}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBeGreaterThan(0);
    });

    // ---------------------------------------------------------
    // GET - Products by Category
    // ---------------------------------------------------------

    test('GET - Products by Category @master @regression @api', async ({ request }) => {
        const category = 'electronics';
        const response = await request.get(`${BASE_URL}${Routes.GET_PRODUCTS_BY_CATEGORY.replace('{category}', category)}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBeGreaterThan(0);

        for (const product of responseBody) {
            expect(product.category).toBe(category);
        }
    });

    // ---------------------------------------------------------
    // POST - Create Product
    // ---------------------------------------------------------

    test('POST - Create Product @master @regression @api', async ({ request }) => {
        const payload = RandomDataUtil.generateProductPayload();

        const response = await request.post(`${BASE_URL}${Routes.CREATE_PRODUCT}`, {
            data: payload,
        });

        expect(response.status()).toBe(201);

        const responseBody = await response.json();

        expect(responseBody.id).toBeTruthy();
        expect(responseBody.title).toBe(payload.title);
        expect(responseBody.price).toBe(payload.price);
        expect(responseBody.category).toBe(payload.category);
    });

    // ---------------------------------------------------------
    // PUT - Update Product
    // ---------------------------------------------------------

    test('PUT - Update Product @master @regression @api', async ({ request }) => {
        const payload = RandomDataUtil.generateUpdatedProductPayload();

        const response = await request.put(`${BASE_URL}${Routes.UPDATE_PRODUCT.replace('{id}', String(PRODUCT_ID))}`, {
            data: payload,
        });

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody.id).toBe(PRODUCT_ID);
        expect(responseBody.title).toBe(payload.title);
        expect(responseBody.price).toBe(payload.price);
    });

    // ---------------------------------------------------------
    // DELETE - Delete Product
    // ---------------------------------------------------------

    test('DELETE - Delete Product @master @regression @api', async ({ request }) => {
        const response = await request.delete(`${BASE_URL}${Routes.DELETE_PRODUCT.replace('{id}', String(PRODUCT_ID))}`);

        expect(response.status()).toBe(200);
    });
});
