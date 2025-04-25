import { Request, Response } from 'express';
import Auth0User from '../models/auth.user';
import { logger, logHttpRequest } from '../util/loggerUtils';
import { getUserAuthStatus } from '../services/auth.service';
import { RequestContext, ResponseContext } from 'express-openid-connect';


interface ReqOIDC extends Request { oidc: RequestContext }

function isLoggedIn(req: ReqOIDC) {
  return req.oidc?.isAuthenticated?.() === true;
}

export const home = async(req: Request, res: Response): Promise<any> => {
    if (isLoggedIn(req)) {
      return res.status(200).json({ success: true, message: 'User is logged in' });
    }
    logHttpRequest(req)
    return res.status(401).json({ success: false, message: 'User not authenticated' });
} 

export const loginController = async(req: Request, res:Response): Promise<any> => {
    try {
        res.oidc.login({ returnTo: '/auth/loginSuccess' });
    } catch (e) {
        logHttpRequest(req, "An error has occurred whilst logging into OAUTH provider")
    }
}


export const loginSuccessController = async (req: Request, res: Response): Promise<any> => {
  const { email, sub: providerId } = req.oidc.user as Auth0User;

  if (!email || !providerId) {
    logger.warn('Missing required Auth0 fields', { email, providerId });
    return res.status(400).json({
      success: false,
      message: 'Missing required Auth0 user information',
      details: { email, providerId },
    });
  }
  try {
    const { needsOnboarding, user } = await getUserAuthStatus(email, providerId);

    if (needsOnboarding) {
        return res.status(200).json({
          success: false,
          message: 'User is currently onboarding',
          onboarding: true,
          email,
          providerId,
        });
      }
      
      logger.info('User successfully logged in ', { email });

      return res.status(200).json({
        success: true,
        message: 'You have been logged in',
        onboarding: false,
        user,
      });

  } catch (e) {
    logger.error('Login error during loginSuccess', {
      error: (e as Error).message,
      email,
      providerId,
    });

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const logoutController = async (req: Request, res: Response) : Promise<void> => {
    try{
        await res.oidc.logout()
        res.status(200).json({ success: true, message: 'You have been logged out' });  

    }catch(e){
        logHttpRequest(req, "An error occurred logging the user out")
        res.status(500).json({ success: false, message: 'An error has occurred whilst signing you out' });  
    }
}

export const getProfile = async (req: Request, res: Response) : Promise<any> => {
        return res.status(200).json({ success: true, user: req.oidc.user });
}

