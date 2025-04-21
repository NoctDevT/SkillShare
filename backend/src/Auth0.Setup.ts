import server from "./server";
import { auth } from "express-openid-connect";
import  { NextFunction, Request, Response } from 'express'

const config = {
    authRequired: false,
    auth0Logout: true
  };
  
server.use(function (req: Request, res: Response, next: NextFunction) {
    res.locals.user = req.oidc.user;
    next();
  });

server.use(auth(config));
