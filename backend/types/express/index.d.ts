import 'express';
import { RequestContext, ResponseContext } from 'express-openid-connect';

declare module 'express' {
  interface Request {
    oidc: RequestContext;
  }
  interface Response {
    oidc: ResponseContext;
  }
}
