import { Router} from 'express';
import { requiresAuth } from 'express-openid-connect';
import { getUserProfile, onboarding } from '@src/controllers/user.controller';

const userRouter = Router();

userRouter.get('/onboarding', requiresAuth(), onboarding);
userRouter.get('/getUserProfile', requiresAuth(), getUserProfile );

export default userRouter;