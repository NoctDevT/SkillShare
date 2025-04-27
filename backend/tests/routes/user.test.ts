import request from 'supertest';
import { createTestServer } from '../utils/server';
import { Prisma, User } from '../../src/prismaGenerated';
import { UserType } from '@prisma/client';
import { UserOnboardingType} from "../../src/models/user/UserSchema"
import { createTestDbUser, deleteTestUser } from '../utils/dbHelper';

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

    beforeAll(async () => {
        await createTestDbUser();
      });
    
      afterAll(async () => {
        await deleteTestUser();
      });


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

    it('should return 400 and validation error if onboarding data is invalid', async () => {
        const app = createTestServer({ isAuthenticated: true, user: { email: "john@smith.com" } });
      
        let user = {
          name: "John",
          type: "BOTH",
        };
      
        const res = await request(app)
          .post('/user/onboarding')
          .send(user);
      
        expect(res.status).toBe(400);
        expect(res.body.error).toBe("Validation failed");
      });


      it('should return 200 and success true if onboarding data is valid', async () => {
        const app = createTestServer({ 
          isAuthenticated: true, 
          user: { email: "johnsmith@example.com" } 
        });
      
        const validUser: UserOnboardingType = {
            name: "John",
            type: "BOTH",
            accountStatus: "PENDING"
          };
      
        const res = await request(app)
          .post('/user/onboarding')
          .send(validUser);
      
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.user).toBeDefined(); 
      });
      
      


});

