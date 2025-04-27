import express, { Request, Response, NextFunction } from 'express';
import authRouter from '../../src/routes/auth';
import userRouter from "../../src/routes/user"
import { Prisma, User } from '../../src/prismaGenerated';
import prisma from '../../src/util/db';

interface MockOidc {
  isAuthenticated?: boolean;
  user?: any;
  InternalError? : boolean
}

export function createTestServer(mockOidc: MockOidc = {InternalError: false}) {
  const app = express();
  app.use(express.json());

  app.use((req: Request, res: Response, next: NextFunction) => {
    const oidcMock = {
      isAuthenticated: () => !!mockOidc.isAuthenticated,
      user: mockOidc.user || null,
      login: ({ returnTo = '/auth/loginSuccess' }) => res.redirect(returnTo),
      logout: () =>  mockOidc.InternalError ? (() => { throw new Error("error")} )(): mockOidc.isAuthenticated = false,
      fetchUserInfo: async () => mockOidc.user || {},
      InternalError: mockOidc.InternalError
    };

    (req as any).oidc = oidcMock;
    (res as any).oidc = oidcMock;

    next();
  });

  app.use('/auth', authRouter);
  app.use('/user', userRouter);

  return app;
}


