"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
class ApiResponse {
    static send(res, statusCode, message, data, meta) {
        const payload = {
            success: statusCode < 400,
            message,
            data,
            meta,
            timestamp: new Date().toISOString(),
        };
        return res.status(statusCode).json(payload);
    }
    static ok(res, message, data, meta) {
        return ApiResponse.send(res, 200, message, data, meta);
    }
    static created(res, message, data) {
        return ApiResponse.send(res, 201, message, data);
    }
    static error(res, statusCode, message, errors) {
        const payload = {
            success: false,
            message,
            errors,
            timestamp: new Date().toISOString(),
        };
        return res.status(statusCode).json(payload);
    }
}
exports.ApiResponse = ApiResponse;
//# sourceMappingURL=ApiResponse.js.map