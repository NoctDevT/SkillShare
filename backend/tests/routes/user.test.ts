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

describe('User Routes', () => {

    it('redirect on /user/onboarding and sends user to sign up', async () => {
        const app = createTestServer({isAuthenticated: false});
        const res = await request(app).post('/user/onboarding');
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ success: false, message: 'Unauthorized' });
    });

    it('redirect on /user/onboarding and sends user to sign up', async () => {
        const app = createTestServer({isAuthenticated: false});
        const res = await request(app).get('/user/getUserProfile');
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ success: false, message: 'Unauthorized' });
    });


});

