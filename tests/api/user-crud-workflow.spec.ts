import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { Routes } from '../../api/endpoints/routes';

dotenv.config();

test.describe('User CRUD Workflow', () => {

    const BASE_URL = Routes.BASE_URL;

    test('User CRUD Workflow @master @regression @api @e2e', async ({ request }) => {
        const createPayload = {
            email: 'workflow@example.com',
            username: 'workflowuser',
            password: 'workflow123',
            name: {
                firstname: 'Workflow',
                lastname: 'User',
            },
            address: {
                city: 'Workflow City',
                street: 'Workflow Street',
                number: 10,
                zipcode: '10000',
                geolocation: {
                    lat: '10.0000',
                    long: '20.0000',
                },
            },
            phone: '1-000-000-0000',
        };

        const updatePayload = {
            ...createPayload,
            email: 'workflow.updated@example.com',
            username: 'workflowuser_updated',
            name: {
                firstname: 'Updated',
                lastname: 'User',
            },
        };

        let userId: number;

        await test.step('1) Create a user', async () => {
            const response = await request.post(`${BASE_URL}${Routes.CREATE_USER}`, {
                data: createPayload,
            });

            expect(response.status()).toBe(201);

            const responseBody = await response.json();
            userId = responseBody.id;

            expect(userId).toBeTruthy();
        });

        await test.step('2) Update the created user', async () => {
            const response = await request.put(`${BASE_URL}${Routes.UPDATE_USER.replace('{id}', String(userId))}`, {
                data: updatePayload,
            });

            expect(response.status()).toBe(200);

            const responseBody = await response.json();

            expect(responseBody.email).toBe(updatePayload.email);
            expect(responseBody.username).toBe(updatePayload.username);
            expect(responseBody.name.firstname).toBe(updatePayload.name.firstname);
        });

        await test.step('3) Delete the created user', async () => {
            const response = await request.delete(`${BASE_URL}${Routes.DELETE_USER.replace('{id}', String(userId))}`);

            expect(response.status()).toBe(200);
        });
    });
});
