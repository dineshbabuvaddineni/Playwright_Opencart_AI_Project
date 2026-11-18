import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { Routes } from '../../api/endpoints/routes';

dotenv.config();

test.describe('Product CRUD Workflow', () => {

    const BASE_URL = Routes.BASE_URL;

    test('Product CRUD Workflow @master @regression @api @e2e', async ({ request }) => {
        const createPayload = {
            title: 'Workflow Product',
            price: 123.45,
            description: 'Product created by the API workflow test',
            image: 'https://example.com/product.png',
            category: 'electronics',
        };

        const updatePayload = {
            title: 'Workflow Product Updated',
            price: 543.21,
            description: 'Product updated by the API workflow test',
            image: 'https://example.com/product-updated.png',
            category: 'electronics',
        };

        let productId: number;

        await test.step('1) Create a product', async () => {
            const response = await request.post(`${BASE_URL}${Routes.CREATE_PRODUCT}`, {
                data: createPayload,
            });

            expect(response.status()).toBe(201);

            const responseBody = await response.json();
            productId = responseBody.id;

            expect(productId).toBeTruthy();
        });

        await test.step('2) Update the created product', async () => {
            const response = await request.put(`${BASE_URL}${Routes.UPDATE_PRODUCT.replace('{id}', String(productId))}`, {
                data: updatePayload,
            });

            expect(response.status()).toBe(200);

            const responseBody = await response.json();

            expect(responseBody.id).toBe(productId);
            expect(responseBody.title).toBe(updatePayload.title);
            expect(responseBody.price).toBe(updatePayload.price);
        });

        await test.step('3) Delete the created product', async () => {
            const response = await request.delete(`${BASE_URL}${Routes.DELETE_PRODUCT.replace('{id}', String(productId))}`);

            expect(response.status()).toBe(200);
        });
    });
});
