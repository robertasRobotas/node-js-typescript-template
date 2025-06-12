import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import { pino } from 'pino';
import mongoose from 'mongoose';
import * as path from 'path';

import { openAPIRouter } from '@/api-docs/openAPIRouter';
import errorHandler from '@/common/middleware/errorHandler';
import rateLimiter from '@/common/middleware/rateLimiter';
import { env } from '@/common/utils/envConfig';
import { orderRouter } from './api/order/orderRouter';

const logger = pino({ name: 'server start' });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(rateLimiter);

mongoose
  .connect(env.MONGO_CONNECTION)
  .then(() => console.log('Connected to DB'))
  .catch((err) => {
    console.log('ERR: ', err);
  });

// Request logging
// app.use(requestLogger);

// Routes
app.use('/orders', orderRouter);

// Swagger UI
app.use('swagger', openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
