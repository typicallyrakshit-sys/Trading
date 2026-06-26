"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerPortfolioNamespace = registerPortfolioNamespace;
const logger_1 = require("../../utils/logger");
const constants_1 = require("../../constants");
/**
 * /portfolio namespace
 * Phase 3: Will push live portfolio P&L updates to individual users.
 */
function registerPortfolioNamespace(nsp) {
    nsp.on('connection', (socket) => {
        logger_1.logger.info(`[/portfolio] Client connected: ${socket.id}`);
        socket.on('join:portfolio', (userId) => {
            socket.join(`portfolio:${userId}`);
            logger_1.logger.info(`[/portfolio] ${socket.id} joined portfolio room for user: ${userId}`);
        });
        // Placeholder: emit a portfolio snapshot
        socket.emit(constants_1.SOCKET_EVENTS.PORTFOLIO_UPDATE, {
            cashBalance: 1000000,
            portfolioValue: 1012450,
            unrealizedPnL: 12450,
            realizedPnL: 0,
            timestamp: new Date().toISOString(),
        });
        socket.on('disconnect', () => {
            logger_1.logger.info(`[/portfolio] Client disconnected: ${socket.id}`);
        });
    });
}
//# sourceMappingURL=portfolio.namespace.js.map