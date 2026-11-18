import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { Routes } from '../../api/endpoints/routes';
import { RandomDataUtil } from '../../utils/dataGenerator';

dotenv.config();

test.describe('Users API Tests', () => {

    // ---------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------

    const BASE_URL = Routes.BASE_URL;
    const USER_ID = Number(process.env.USER_ID ?? 1);
    const LIMIT = Number(process.env.LIMIT ?? 3);

    // ---------------------------------------------------------
    // GET - All Users
    // ---------------------------------------------------------

    test('GET - All Users @master @sanity @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_ALL_USERS}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBeGreaterThan(0);
    });

    // ---------------------------------------------------------
    // GET - User by ID
    // ---------------------------------------------------------

    test('GET - User by ID @master @sanity @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_USER_BY_ID.replace('{id}', String(USER_ID))}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody.id).toBe(USER_ID);
    });

    // ---------------------------------------------------------
    // GET - Users with Limit
    // ---------------------------------------------------------

    test('GET - Users with Limit @master @regression @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_USERS_WITH_LIMIT.replace('{limit}', String(LIMIT))}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(Array.isArray(responseBody)).toBeTruthy();
        expect(responseBody.length).toBe(LIMIT);
    });

    // ---------------------------------------------------------
    // GET - Users Sorted Ascending / Descending
    // ---------------------------------------------------------

    test('GET - Users Sorted Ascending @master @regression @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_USERS_SORTED.replace('{order}', 'asc')}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        const ids = responseBody.map((user: { id: number }) => user.id);
        const sortedIds = [...ids].sort((a, b) => a - b);

        expect(ids).toEqual(sortedIds);
    });

    test('GET - Users Sorted Descending @master @regression @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_USERS_SORTED.replace('{order}', 'desc')}`);

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        const ids = responseBody.map((user: { id: number }) => user.id);
        const sortedIds = [...ids].sort((a, b) => b - a);

        expect(ids).toEqual(sortedIds);
    });

    // ---------------------------------------------------------
    // POST - Create User
    // ---------------------------------------------------------

    test('POST - Create User @master @regression @api', async ({ request }) => {
        const payload = RandomDataUtil.generateUserPayload();

        const response = await request.post(`${BASE_URL}${Routes.CREATE_USER}`, {
            data: payload,
        });

        expect(response.status()).toBe(201);

        const responseBody = await response.json();

        expect(responseBody.id).toBeTruthy();
        expect(typeof responseBody.id).toBe('number');
    });

    // ---------------------------------------------------------
    // PUT - Update User
    // ---------------------------------------------------------

    test('PUT - Update User @master @regression @api', async ({ request }) => {
        const payload = RandomDataUtil.generateUserUpdatePayload();

        const response = await request.put(`${BASE_URL}${Routes.UPDATE_USER.replace('{id}', String(USER_ID))}`, {
            data: payload,
        });

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody.email).toBe(payload.email);
        expect(responseBody.username).toBe(payload.username);
        expect(responseBody.name.firstname).toBe(payload.name.firstname);
        expect(responseBody.name.lastname).toBe(payload.name.lastname);
    });

    // ---------------------------------------------------------
    // DELETE - Delete User
    // ---------------------------------------------------------

    test('DELETE - Delete User @master @regression @api', async ({ request }) => {
        const response = await request.delete(`${BASE_URL}${Routes.DELETE_USER.replace('{id}', String(USER_ID))}`);

        expect(response.status()).toBe(200);
    });
});
