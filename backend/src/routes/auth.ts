import { Router, Request, Response, NextFunction } from 'express';
import { requiresAuth, type RequestContext, type ResponseContext } from 'express-openid-connect';
import { logger, logHttpRequest } from '../util/loggerUtils';
import type Auth0User from '../models/auth.user';
import { getProfile, home, loginController, loginSuccessController, logoutController } from '../controllers/auth.controller';

interface ReqOIDC extends Request { oidc: RequestContext }
interface ResOIDC extends Response { oidc: ResponseContext }

const authRouter = Router();



authRouter.get('/', home)

authRouter.get('/login', loginController);
authRouter.get('/logout',  requiresAuth(), logoutController);
authRouter.get('/loginSuccess', requiresAuth(), loginSuccessController )
authRouter.get('/profile', requiresAuth(), getProfile)

export default authRouter;
