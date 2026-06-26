"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.getProfile = void 0;
const user_service_1 = require("../services/user.service");
const ApiResponse_1 = require("../utils/ApiResponse");
const asyncHandler_1 = require("../utils/asyncHandler");
exports.getProfile = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const userId = req.user?.id ?? 'placeholder-user-id';
    const user = await user_service_1.userService.getUserById(userId);
    ApiResponse_1.ApiResponse.ok(res, 'User profile retrieved', user);
});
exports.getAllUsers = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const result = await user_service_1.userService.getAllUsers(page, limit);
    ApiResponse_1.ApiResponse.ok(res, 'Users retrieved', result.data, {
        total: result.total,
        page: result.page,
        totalPages: result.totalPages,
    });
});
//# sourceMappingURL=user.controller.js.map