import { Response } from 'express';
export interface ApiResponsePayload<T> {
    success: boolean;
    message: string;
    data?: T;
    errors?: string[];
    meta?: Record<string, unknown>;
    timestamp: string;
}
export declare class ApiResponse {
    static send<T>(res: Response, statusCode: number, message: string, data?: T, meta?: Record<string, unknown>): Response;
    static ok<T>(res: Response, message: string, data?: T, meta?: Record<string, unknown>): Response;
    static created<T>(res: Response, message: string, data?: T): Response;
    static error(res: Response, statusCode: number, message: string, errors?: string[]): Response;
}
//# sourceMappingURL=ApiResponse.d.ts.map