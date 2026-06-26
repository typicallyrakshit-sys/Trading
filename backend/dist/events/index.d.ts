import { EventEmitter } from 'events';
/**
 * Internal application event bus.
 * Phase 3: Will be used to trigger portfolio recalculation,
 * leaderboard updates, and notification dispatch on order fill.
 */
declare class AppEventEmitter extends EventEmitter {
    constructor();
}
export declare const eventBus: AppEventEmitter;
export declare const APP_EVENTS: {
    readonly ORDER_PLACED: "order:placed";
    readonly ORDER_FILLED: "order:filled";
    readonly ORDER_CANCELLED: "order:cancelled";
    readonly PORTFOLIO_UPDATED: "portfolio:updated";
    readonly LEADERBOARD_REFRESH: "leaderboard:refresh";
    readonly MARKET_TICK: "market:tick";
    readonly USER_REGISTERED: "user:registered";
};
export {};
//# sourceMappingURL=index.d.ts.map