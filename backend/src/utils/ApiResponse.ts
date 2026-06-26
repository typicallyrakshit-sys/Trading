import { Response } from 'express';

export interface ApiResponsePayload<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
  meta?: Record<string, unknown>;
  timestamp: string;
}

export class ApiResponse {
  static send<T>(
    res: Response,
    statusCode: number,
    message: string,
    data?: T,
    meta?: Record<string, unknown>,
  ): Response {
    const payload: ApiResponsePayload<T> = {
      success: statusCode < 400,
      message,
      data,
      meta,
      timestamp: new Date().toISOString(),
    };
    return res.status(statusCode).json(payload);
  }

  static ok<T>(res: Response, message: string, data?: T, meta?: Record<string, unknown>): Response {
    return ApiResponse.send(res, 200, message, data, meta);
  }

  static created<T>(res: Response, message: string, data?: T): Response {
    return ApiResponse.send(res, 201, message, data);
  }

  static error(
    res: Response,
    statusCode: number,
    message: string,
    errors?: string[],
  ): Response {
    const payload = {
      success: false,
      message,
      errors,
      timestamp: new Date().toISOString(),
    };
    return res.status(statusCode).json(payload);
  }
}
