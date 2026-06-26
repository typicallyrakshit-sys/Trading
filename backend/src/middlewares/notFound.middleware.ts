import { Request, Response } from 'express';
import { ApiResponse } from '../utils/ApiResponse';

export function notFoundHandler(req: Request, res: Response): Response {
  return ApiResponse.error(
    res,
    404,
    `Cannot ${req.method} ${req.originalUrl}`,
  );
}
