import express, { Request, Response, NextFunction } from 'express';
import authRouter from '../../src/routes/auth';

interface MockOidc {
  isAuthenticated?: boolean;
  user?: any;
}

export function createTestServer(mockOidc: MockOidc = {}) {
  const app = express();

  app.use((req: Request, res: Response, next: NextFunction) => {
    const oidcMock = {
      isAuthenticated: () => !!mockOidc.isAuthenticated,
      user: mockOidc.user || null,
      login: ({ returnTo = '/auth/loginSuccess' }) => res.redirect(returnTo),
      logout: ({ returnTo = '/auth/logoutSuccess' }) => res.redirect(returnTo),
      fetchUserInfo: async () => mockOidc.user || {},
    };

    (req as any).oidc = oidcMock;
    (res as any).oidc = oidcMock;

    next();
  });

  app.use('/auth', authRouter);
  return app;
}
