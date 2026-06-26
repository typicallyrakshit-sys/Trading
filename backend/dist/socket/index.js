"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocketIO = initializeSocketIO;
exports.getIO = getIO;
const socket_io_1 = require("socket.io");
const env_1 = require("../config/env");
const logger_1 = require("../utils/logger");
const constants_1 = require("../constants");
const market_namespace_1 = require("./namespaces/market.namespace");
const orders_namespace_1 = require("./namespaces/orders.namespace");
const portfolio_namespace_1 = require("./namespaces/portfolio.namespace");
const leaderboard_namespace_1 = require("./namespaces/leaderboard.namespace");
const admin_namespace_1 = require("./namespaces/admin.namespace");
let io;
function initializeSocketIO(httpServer) {
    io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: env_1.env.CLIENT_URL,
            methods: ['GET', 'POST'],
            credentials: true,
        },
        pingTimeout: 60000,
        pingInterval: 25000,
        transports: ['websocket', 'polling'],
    });
    io.on('connection', (socket) => {
        logger_1.logger.info(`🔌 Socket connected: ${socket.id}`);
        socket.on('disconnect', (reason) => {
            logger_1.logger.info(`🔔 Socket disconnected: ${socket.id} — ${reason}`);
        });
    });
    // Register namespaces
    (0, market_namespace_1.registerMarketNamespace)(io.of(constants_1.SOCKET_NAMESPACES.MARKET));
    (0, orders_namespace_1.registerOrdersNamespace)(io.of(constants_1.SOCKET_NAMESPACES.ORDERS));
    (0, portfolio_namespace_1.registerPortfolioNamespace)(io.of(constants_1.SOCKET_NAMESPACES.PORTFOLIO));
    (0, leaderboard_namespace_1.registerLeaderboardNamespace)(io.of(constants_1.SOCKET_NAMESPACES.LEADERBOARD));
    (0, admin_namespace_1.registerAdminNamespace)(io.of(constants_1.SOCKET_NAMESPACES.ADMIN));
    logger_1.logger.info('📡 Socket.IO initialized with namespaces: ' + Object.values(constants_1.SOCKET_NAMESPACES).join(', '));
    return io;
}
function getIO() {
    if (!io)
        throw new Error('Socket.IO not initialized. Call initializeSocketIO first.');
    return io;
}
//# sourceMappingURL=index.js.map