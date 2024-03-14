import type { LooseAuthProp } from '@clerk/clerk-sdk-node';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import express, { type Express } from 'express';
import pino from 'pino-http';

import { questionRouter } from './routers/question-router';

declare global {
  namespace Express {
    interface Request extends LooseAuthProp {}
  }

  interface CustomJwtSessionClaims {
    email: string;
  }
}

export const createServer = (): Express => {
  const app = express();
  app
    .disable('x-powered-by')
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use(pino())
    .use(ClerkExpressRequireAuth())
    .use('/api/questions', questionRouter);

  return app;
};
