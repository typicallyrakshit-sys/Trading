"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAdminNamespace = registerAdminNamespace;
const logger_1 = require("../../utils/logger");
const constants_1 = require("../../constants");
/**
 * /admin namespace
 * Phase 3: Will stream admin-level stats (active users, order volume, etc.).
 */
function registerAdminNamespace(nsp) {
    nsp.on('connection', (socket) => {
        logger_1.logger.info(`[/admin] Admin client connected: ${socket.id}`);
        socket.emit(constants_1.SOCKET_EVENTS.ADMIN_STATS, {
            activeConnections: 0,
            totalUsers: 0,
            totalOrders: 0,
            serverUptime: process.uptime(),
            timestamp: new Date().toISOString(),
        });
        socket.on('disconnect', () => {
            logger_1.logger.info(`[/admin] Admin client disconnected: ${socket.id}`);
        });
    });
}
//# sourceMappingURL=admin.namespace.js.map