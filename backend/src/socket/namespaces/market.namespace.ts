import { Namespace } from 'socket.io';
import { logger } from '../../utils/logger';
import { SOCKET_EVENTS } from '../../constants';

/**
 * /market namespace
 * Phase 3: Will stream live Binance market ticks to all connected clients.
 */
export function registerMarketNamespace(nsp: Namespace): void {
  nsp.on('connection', (socket) => {
    logger.info(`[/market] Client connected: ${socket.id}`);

    // Placeholder: emit a market tick immediately on connect
    socket.emit(SOCKET_EVENTS.MARKET_TICK, {
      symbol: 'BTCUSDT',
      price: 30000,
      change24h: 500,
      changePercent24h: 1.69,
      high24h: 30500,
      low24h: 29800,
      volume24h: 12500,
      timestamp: new Date().toISOString(),
    });

    socket.on('subscribe', (symbols: string[]) => {
      logger.info(`[/market] ${socket.id} subscribed to: ${symbols.join(', ')}`);
      socket.join(symbols);
    });

    socket.on('unsubscribe', (symbols: string[]) => {
      symbols.forEach((s) => socket.leave(s));
    });

    socket.on('disconnect', () => {
      logger.info(`[/market] Client disconnected: ${socket.id}`);
    });
  });
}
