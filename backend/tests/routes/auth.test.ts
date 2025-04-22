import request from 'supertest';
import { createTestServer } from '../utils/server';

jest.mock('express-openid-connect', () => ({
    ...jest.requireActual('express-openid-connect'),
    requiresAuth: () => (_req: any, _res: any, next: any) => next(),
}));

describe('Auth Routes', () => {
    it('return 401 if user is not authenticated on /auth', async () => {
        const app = createTestServer();

        const res = await request(app).get('/auth');
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ success: false, message: 'User not authenticated' });
    });

    it('should return 200 if user is authenticated on /auth', async () => {
        const app = createTestServer({ isAuthenticated: true });

        const res = await request(app).get('/auth');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ success: true, message: 'User is logged in' });
    });

    it('should return 401 on /auth/profile if not logged in', async () => {
        const app = createTestServer();

        const res = await request(app).get('/auth/profile');
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ success: false, message: 'Unauthorized' });
    });



    it('return user info on /auth/profile if logged in', async () => {
        const app = createTestServer({
            isAuthenticated: true,
            user: { email: 'test@example.com', name: 'Tester' },
        });

        const res = await request(app).get('/auth/profile');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            success: true,
            user: { email: 'test@example.com', name: 'Tester' },
        });
    });


    it('redirect on /auth/login and match /auth/loginSuccess ', async () => {
        const app = createTestServer({ isAuthenticated: false });

        const res = await request(app).get('/auth/login');
        expect(res.status).toBe(302);
        expect(res.headers.location).toBe('/auth/loginSuccess');
    });

    it('redirect on /auth/logout and match /auth/logoutSuccess', async () => {
        const app = createTestServer({ isAuthenticated: true });

        const res = await request(app).get('/auth/logout');
        expect(res.status).toBe(302);
        expect(res.headers.location).toBe('/auth/logoutSuccess');
    });
});
