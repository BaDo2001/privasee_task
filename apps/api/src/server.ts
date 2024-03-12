import { json, urlencoded } from 'body-parser';
import express, { type Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import pino from 'pino-http';
import { questionRouter } from './routers/question-router';

export const createServer = (): Express => {
  const app = express();
  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use(pino())
    .use(ClerkExpressRequireAuth())
    .use('/api/questions', questionRouter);

  return app;
};
