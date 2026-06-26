"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_EVENTS = exports.eventBus = void 0;
const events_1 = require("events");
const logger_1 = require("../utils/logger");
/**
 * Internal application event bus.
 * Phase 3: Will be used to trigger portfolio recalculation,
 * leaderboard updates, and notification dispatch on order fill.
 */
class AppEventEmitter extends events_1.EventEmitter {
    constructor() {
        super();
        this.setMaxListeners(50);
    }
}
exports.eventBus = new AppEventEmitter();
// ---- Event name constants ----
exports.APP_EVENTS = {
    ORDER_PLACED: 'order:placed',
    ORDER_FILLED: 'order:filled',
    ORDER_CANCELLED: 'order:cancelled',
    PORTFOLIO_UPDATED: 'portfolio:updated',
    LEADERBOARD_REFRESH: 'leaderboard:refresh',
    MARKET_TICK: 'market:tick',
    USER_REGISTERED: 'user:registered',
};
// ---- Listener registrations (placeholders) ----
exports.eventBus.on(exports.APP_EVENTS.ORDER_FILLED, (payload) => {
    logger_1.logger.info(`[EventBus] Order filled — orderId: ${payload.orderId}, userId: ${payload.userId}`);
    // Phase 3: Trigger portfolio recalculation and leaderboard update here
});
exports.eventBus.on(exports.APP_EVENTS.USER_REGISTERED, (payload) => {
    logger_1.logger.info(`[EventBus] New user registered — ${payload.email} (${payload.userId})`);
    // Phase 3: Send welcome email, create initial portfolio record
});
exports.eventBus.on(exports.APP_EVENTS.LEADERBOARD_REFRESH, () => {
    logger_1.logger.info('[EventBus] Leaderboard refresh triggered');
    // Phase 3: Call leaderboardService.refreshLeaderboard() and broadcast via socket
});
//# sourceMappingURL=index.js.map