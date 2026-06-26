"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMarketNamespace = registerMarketNamespace;
const logger_1 = require("../../utils/logger");
const constants_1 = require("../../constants");
/**
 * /market namespace
 * Phase 3: Will stream live Binance market ticks to all connected clients.
 */
function registerMarketNamespace(nsp) {
    nsp.on('connection', (socket) => {
        logger_1.logger.info(`[/market] Client connected: ${socket.id}`);
        // Placeholder: emit a market tick immediately on connect
        socket.emit(constants_1.SOCKET_EVENTS.MARKET_TICK, {
            symbol: 'BTCUSDT',
            price: 30000,
            change24h: 500,
            changePercent24h: 1.69,
            high24h: 30500,
            low24h: 29800,
            volume24h: 12500,
            timestamp: new Date().toISOString(),
        });
        socket.on('subscribe', (symbols) => {
            logger_1.logger.info(`[/market] ${socket.id} subscribed to: ${symbols.join(', ')}`);
            socket.join(symbols);
        });
        socket.on('unsubscribe', (symbols) => {
            symbols.forEach((s) => socket.leave(s));
        });
        socket.on('disconnect', () => {
            logger_1.logger.info(`[/market] Client disconnected: ${socket.id}`);
        });
    });
}
//# sourceMappingURL=market.namespace.js.map