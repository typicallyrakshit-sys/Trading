"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerOrdersNamespace = registerOrdersNamespace;
const logger_1 = require("../../utils/logger");
const constants_1 = require("../../constants");
/**
 * /orders namespace
 * Phase 3: Will broadcast real-time order status updates to authenticated users.
 */
function registerOrdersNamespace(nsp) {
    nsp.on('connection', (socket) => {
        logger_1.logger.info(`[/orders] Client connected: ${socket.id}`);
        socket.on('join:user', (userId) => {
            socket.join(`user:${userId}`);
            logger_1.logger.info(`[/orders] ${socket.id} joined room user:${userId}`);
        });
        // Placeholder: send a sample order update
        socket.emit(constants_1.SOCKET_EVENTS.ORDER_UPDATE, {
            orderId: 'sample-order-id',
            status: 'FILLED',
            timestamp: new Date().toISOString(),
        });
        socket.on('disconnect', () => {
            logger_1.logger.info(`[/orders] Client disconnected: ${socket.id}`);
        });
    });
}
//# sourceMappingURL=orders.namespace.js.map