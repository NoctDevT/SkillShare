import { Router, Request, Response, NextFunction } from 'express';
import { requiresAuth, type RequestContext, type ResponseContext } from 'express-openid-connect';
import { logger, logHttpRequest } from '../util/loggerUtils';

interface ReqOIDC extends Request { oidc: RequestContext }
interface ResOIDC extends Response { oidc: ResponseContext }

const authRouter = Router();

function isLoggedIn(req: ReqOIDC) {
  return req.oidc?.isAuthenticated?.() === true;
}

authRouter.get('/', (req: ReqOIDC, res: Response) : any => {
  if (isLoggedIn(req)) {
    logger.info(`Authenticated user accessed /auth: ${req.oidc.user?.email || 'unknown email'}`);
    return res.status(200).json({ success: true, message: 'User is logged in' });
  }
  logHttpRequest(req)
  return res.status(401).json({ success: false, message: 'User not authenticated' });
});

authRouter.get('/login', (_req, res: ResOIDC) => {
  res.oidc.login({ returnTo: '/auth/loginSuccess' });      
});

authRouter.get('/logout', (_req, res: ResOIDC) => {
  res.oidc.logout({ returnTo: '/auth/logoutSuccess' });    
});

authRouter.get('/loginSuccess', requiresAuth(), (_req, res) => {
  res.status(200).json({ success: true, message: 'You have been logged in' });
});

authRouter.get('/logoutSuccess',  (_req, res) => {
  res.status(200).json({ success: true, message: 'You have been logged out' });
});

authRouter.get('/profile', requiresAuth(), (req: ReqOIDC, res: Response) : any => {
  if (!isLoggedIn(req)) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  return res.status(200).json({ success: true, user: req.oidc.user });
});

export default authRouter;
