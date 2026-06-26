import { EventEmitter } from 'events';
import { logger } from '../utils/logger';

/**
 * Internal application event bus.
 * Phase 3: Will be used to trigger portfolio recalculation,
 * leaderboard updates, and notification dispatch on order fill.
 */
class AppEventEmitter extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(50);
  }
}

export const eventBus = new AppEventEmitter();

// ---- Event name constants ----
export const APP_EVENTS = {
  ORDER_PLACED: 'order:placed',
  ORDER_FILLED: 'order:filled',
  ORDER_CANCELLED: 'order:cancelled',
  PORTFOLIO_UPDATED: 'portfolio:updated',
  LEADERBOARD_REFRESH: 'leaderboard:refresh',
  MARKET_TICK: 'market:tick',
  USER_REGISTERED: 'user:registered',
} as const;

// ---- Listener registrations (placeholders) ----
eventBus.on(APP_EVENTS.ORDER_FILLED, (payload: { orderId: string; userId: string }) => {
  logger.info(`[EventBus] Order filled — orderId: ${payload.orderId}, userId: ${payload.userId}`);
  // Phase 3: Trigger portfolio recalculation and leaderboard update here
});

eventBus.on(APP_EVENTS.USER_REGISTERED, (payload: { userId: string; email: string }) => {
  logger.info(`[EventBus] New user registered — ${payload.email} (${payload.userId})`);
  // Phase 3: Send welcome email, create initial portfolio record
});

eventBus.on(APP_EVENTS.LEADERBOARD_REFRESH, () => {
  logger.info('[EventBus] Leaderboard refresh triggered');
  // Phase 3: Call leaderboardService.refreshLeaderboard() and broadcast via socket
});
