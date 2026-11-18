import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { Routes } from '../../api/endpoints/routes';

dotenv.config();

test.describe('Cart CRUD Workflow', () => {

    const BASE_URL = Routes.BASE_URL;
    const USER_ID = Number(process.env.USER_ID ?? 1);

    test('Cart CRUD Workflow @master @regression @api @e2e', async ({ request }) => {
        const createPayload = {
            userId: USER_ID,
            date: '2020-01-01',
            products: [
                {
                    productId: 1,
                    quantity: 2,
                },
            ],
        };

        const updatePayload = {
            userId: USER_ID,
            date: '2020-01-01',
            products: [
                {
                    productId: 1,
                    quantity: 5,
                },
            ],
        };

        let cartId: number;

        await test.step('1) Create a cart', async () => {
            const response = await request.post(`${BASE_URL}${Routes.CREATE_CART}`, {
                data: createPayload,
            });

            expect(response.status()).toBe(201);

            const responseBody = await response.json();
            cartId = responseBody.id;

            expect(cartId).toBeTruthy();
            expect(responseBody.userId).toBe(createPayload.userId);
            expect(Array.isArray(responseBody.products)).toBeTruthy();
            expect(responseBody.products.length).toBeGreaterThan(0);
        });

        await test.step('2) Update the created cart', async () => {
            const response = await request.put(`${BASE_URL}${Routes.UPDATE_CART.replace('{id}', String(cartId))}`, {
                data: updatePayload,
            });

            expect(response.status()).toBe(200);

            const responseBody = await response.json();

            expect(responseBody.id).toBe(cartId);
            expect(responseBody.products[0].quantity).toBe(updatePayload.products[0].quantity);
        });

        await test.step('3) Delete the created cart', async () => {
            const response = await request.delete(`${BASE_URL}${Routes.DELETE_CART.replace('{id}', String(cartId))}`);

            expect(response.status()).toBe(200);
        });
    });
});
