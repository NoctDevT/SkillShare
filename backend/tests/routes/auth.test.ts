import request from 'supertest';
import { createTestServer } from '../utils/server';

jest.mock('express-openid-connect', () => ({
    ...jest.requireActual('express-openid-connect'),
    requiresAuth: () => (req: any, res: any, next: any) => {
        if (req.oidc?.isAuthenticated?.()) {
          next();
        } else {
          res.status(401).json({ success: false, message: 'Unauthorized' });
        }
      },
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
        console.log(res.body)
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
        const app = createTestServer({ isAuthenticated: false })
        const res = await request(app).get('/auth/login');
        expect(res.status).toBe(302);
        expect(res.headers.location).toBe('/auth/loginSuccess');
    });



    it('Internal server error on /auth/login and match status 500', async () => {
        const app = createTestServer({ isAuthenticated: true, InternalError: true});

        const res = await request(app).get('/auth/logout');
        expect(res.status).toBe(500);
        expect(res.body).toStrictEqual({success: false, message: 'An error has occurred whilst signing you out'});
    });
});

