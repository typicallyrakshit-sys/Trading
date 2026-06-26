"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheck = healthCheck;
const database_1 = require("../config/database");
const ApiResponse_1 = require("../utils/ApiResponse");
async function healthCheck(req, res) {
    const dbHealthy = await (0, database_1.checkDatabaseHealth)();
    const data = {
        status: 'ok',
        server: 'running',
        database: dbHealthy ? 'connected' : 'disconnected',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: process.env.npm_package_version ?? '1.0.0',
    };
    ApiResponse_1.ApiResponse.ok(res, 'Health check passed', data);
}
//# sourceMappingURL=health.controller.js.map