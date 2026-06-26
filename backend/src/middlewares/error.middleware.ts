import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { logger } from '../utils/logger';
import { env } from '../config/env';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): Response {
  logger.error(`${req.method} ${req.originalUrl} — ${err.message}`, {
    stack: err.stack,
    body: req.body,
    params: req.params,
    query: req.query,
  });

  if (err instanceof ApiError) {
    return ApiResponse.error(res, err.statusCode, err.message, err.errors);
  }

  // Prisma known errors
  if (err.constructor.name === 'PrismaClientKnownRequestError') {
    const prismaErr = err as Error & { code?: string };
    if (prismaErr.code === 'P2002') {
      return ApiResponse.error(res, 409, 'A record with this data already exists.');
    }
    if (prismaErr.code === 'P2025') {
      return ApiResponse.error(res, 404, 'Record not found.');
    }
  }

  // Validation errors
  if (err.name === 'ZodError') {
    return ApiResponse.error(res, 400, 'Validation error', [err.message]);
  }

  // Generic fallback
  const message =
    env.NODE_ENV === 'development' ? err.message : 'Internal Server Error';

  return ApiResponse.error(res, 500, message);
}
