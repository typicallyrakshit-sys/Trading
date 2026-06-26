"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminStats = void 0;
const user_service_1 = require("../services/user.service");
const order_service_1 = require("../services/order.service");
const ApiResponse_1 = require("../utils/ApiResponse");
const asyncHandler_1 = require("../utils/asyncHandler");
const database_1 = require("../config/database");
exports.getAdminStats = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const [totalUsers, totalOrders, dbHealthy] = await Promise.all([
        user_service_1.userService.getTotalUserCount(),
        order_service_1.orderService.getTotalOrderCount(),
        (0, database_1.checkDatabaseHealth)(),
    ]);
    ApiResponse_1.ApiResponse.ok(res, 'Admin stats retrieved', {
        totalUsers,
        totalOrders,
        database: dbHealthy ? 'healthy' : 'unhealthy',
        serverUptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});
//# sourceMappingURL=admin.controller.js.map