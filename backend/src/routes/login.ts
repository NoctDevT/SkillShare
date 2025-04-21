// Login with oAuth0 provider
import {Router, NextFunction, Request, Response } from 'express'

const authRouter = Router();

authRouter.get('/', (req: Request, res: Response) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });

authRouter.get('/login', (req: Request, res: Response) => {
    res.oidc.login();
  });

authRouter.get('/logout', (req: Request, res: Response) => {
    res.oidc.logout();
 });

authRouter.get("/profile", (req: Request, res: Response)=> {
    res.send(JSON.stringify(req.oidc.user));
 });


 export default authRouter; 