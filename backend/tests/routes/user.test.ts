import request from 'supertest';
import { createTestServer } from '../utils/server';
import { Prisma, User } from '../../src/prismaGenerated';
import { UserType } from '@prisma/client';

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

    it('redirect on /user/onboarding and sends user to sign up if not authenticated', async () => {
        const app = createTestServer({isAuthenticated: false});
        const res = await request(app).post('/user/onboarding');
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ success: false, message: 'Unauthorized' });
    });

    it('redirect on /user/getUserProfile and sends user to sign up if not authenticated', async () => {
        const app = createTestServer({isAuthenticated: false});
        const res = await request(app).get('/user/getUserProfile');
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ success: false, message: 'Unauthorized' });
    });

    // it('return success true & return user on /user/onboarding if user is onboarding', async () => {
    //     const app = createTestServer({isAuthenticated: true});
    //     let user : Prisma.UserCreateInput = {
    //         name: "John",
    //         email: "john@smith.com",
    //         provider: "google",
    //         providerId: "google.com",
    //         accountStatus: "PENDING",
    //         type: "STUDENT", 
    //         skills: {
    //           create: [] 
    //         },
    //         studentSessions: {
    //           create: []
    //         },
    //         teacherSessions: {
    //           create: []
    //         }
    //     }
    //     const res = await request(app)
    //         .post('/user/onboarding')
    //         .send(user);

       
    //     expect(res.status).toBe(400);
    //     expect(res.body).toEqual({ success: false, message: 'Unauthorized' });
    // });


});

