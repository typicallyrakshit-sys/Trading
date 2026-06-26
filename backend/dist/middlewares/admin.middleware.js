"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = void 0;
const ApiError_1 = require("../utils/ApiError");
const asyncHandler_1 = require("../utils/asyncHandler");
/**
 * Admin authorization middleware.
 * Must be used AFTER authenticate middleware.
 */
exports.requireAdmin = (0, asyncHandler_1.asyncHandler)(async (req, _res, next) => {
    if (!req.user) {
        throw ApiError_1.ApiError.unauthorized('Not authenticated');
    }
    if (req.user.role !== 'ADMIN') {
        throw ApiError_1.ApiError.forbidden('Administrator access required');
    }
    next();
});
//# sourceMappingURL=admin.middleware.js.map