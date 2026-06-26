"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const ApiError_1 = require("../utils/ApiError");
const ApiResponse_1 = require("../utils/ApiResponse");
const logger_1 = require("../utils/logger");
const env_1 = require("../config/env");
function errorHandler(err, req, res, _next) {
    logger_1.logger.error(`${req.method} ${req.originalUrl} — ${err.message}`, {
        stack: err.stack,
        body: req.body,
        params: req.params,
        query: req.query,
    });
    if (err instanceof ApiError_1.ApiError) {
        return ApiResponse_1.ApiResponse.error(res, err.statusCode, err.message, err.errors);
    }
    // Prisma known errors
    if (err.constructor.name === 'PrismaClientKnownRequestError') {
        const prismaErr = err;
        if (prismaErr.code === 'P2002') {
            return ApiResponse_1.ApiResponse.error(res, 409, 'A record with this data already exists.');
        }
        if (prismaErr.code === 'P2025') {
            return ApiResponse_1.ApiResponse.error(res, 404, 'Record not found.');
        }
    }
    // Validation errors
    if (err.name === 'ZodError') {
        return ApiResponse_1.ApiResponse.error(res, 400, 'Validation error', [err.message]);
    }
    // Generic fallback
    const message = env_1.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error';
    return ApiResponse_1.ApiResponse.error(res, 500, message);
}
//# sourceMappingURL=error.middleware.js.map