import { Router} from 'express';
import { requiresAuth } from 'express-openid-connect';
import { getUserProfile, onboarding } from '@src/controllers/user.controller';

const userRouter = Router();

//Application sends data to endpoint to onboard the user e.g. enter fields into DB
userRouter.post('/onboarding', requiresAuth(), onboarding);
userRouter.get('/getUserProfile', requiresAuth(), getUserProfile );

export default userRouter;