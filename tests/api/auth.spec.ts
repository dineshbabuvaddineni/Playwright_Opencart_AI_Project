import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { Routes } from '../../api/endpoints/routes';

dotenv.config({ override: true });

test.describe('Authentication API Tests', () => {

    // ---------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------

    const BASE_URL = Routes.BASE_URL;
    const USERNAME = process.env.USERNAME || 'mor_2314';
    const PASSWORD = process.env.PASSWORD || '83r5^_';

    // ---------------------------------------------------------
    // Successful Login
    // ---------------------------------------------------------

    test('POST - Successful Login @master @sanity @api', async ({ request }) => {
        const response = await request.post(`${BASE_URL}${Routes.AUTH_LOGIN}`, {
            data: {
                username: USERNAME,
                password: PASSWORD,
            },
        });

        expect(response.status()).toBe(201);

        const responseBody = await response.json();

        expect(responseBody.token).toBeTruthy();
        expect(typeof responseBody.token).toBe('string');
        expect(responseBody.token.trim().length).toBeGreaterThan(0);
    });

    // ---------------------------------------------------------
    // Invalid Login
    // ---------------------------------------------------------

    test('POST - Invalid Login @master @regression @api', async ({ request }) => {
        const response = await request.post(`${BASE_URL}${Routes.AUTH_LOGIN}`, {
            data: {
                username: 'invalid_user',
                password: 'invalid_password',
            },
        });

        expect(response.status()).toBe(401);

        const responseText = await response.text();
        expect(responseText).toBe('username or password is incorrect');
    });
});
