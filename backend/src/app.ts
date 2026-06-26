import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { env } from './config/env';
import { logger } from './utils/logger';
import { globalRateLimiter } from './middlewares/rateLimiter.middleware';
import { errorHandler } from './middlewares/error.middleware';
import { notFoundHandler } from './middlewares/notFound.middleware';
import { API_PREFIX } from './constants';
import apiRouter from './routes/index';

export function createApp(): Application {
  const app = express();

  // ---- Security headers ----
  app.use(
    helmet({
      contentSecurityPolicy: env.NODE_ENV === 'production',
      crossOriginEmbedderPolicy: false,
    }),
  );

  // ---- CORS ----
  app.use(
    cors({
      origin: env.CLIENT_URL,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  );

  // ---- Request parsing ----
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));
  app.use(cookieParser());

  // ---- Compression ----
  app.use(compression());

  // ---- HTTP request logging ----
  if (env.NODE_ENV !== 'test') {
    app.use(
      morgan('combined', {
        stream: {
          write: (message: string) => logger.http(message.trim()),
        },
      }),
    );
  }

  // ---- Rate limiting ----
  app.use(globalRateLimiter);

  // ---- API routes ----
  app.use(API_PREFIX, apiRouter);

  // ---- 404 handler ----
  app.use(notFoundHandler);

  // ---- Global error handler ----
  app.use(errorHandler);

  return app;
}
