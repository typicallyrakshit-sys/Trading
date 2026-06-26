import { Namespace } from 'socket.io';
import { logger } from '../../utils/logger';
import { SOCKET_EVENTS } from '../../constants';

/**
 * /portfolio namespace
 * Phase 3: Will push live portfolio P&L updates to individual users.
 */
export function registerPortfolioNamespace(nsp: Namespace): void {
  nsp.on('connection', (socket) => {
    logger.info(`[/portfolio] Client connected: ${socket.id}`);

    socket.on('join:portfolio', (userId: string) => {
      socket.join(`portfolio:${userId}`);
      logger.info(`[/portfolio] ${socket.id} joined portfolio room for user: ${userId}`);
    });

    // Placeholder: emit a portfolio snapshot
    socket.emit(SOCKET_EVENTS.PORTFOLIO_UPDATE, {
      cashBalance: 1000000,
      portfolioValue: 1012450,
      unrealizedPnL: 12450,
      realizedPnL: 0,
      timestamp: new Date().toISOString(),
    });

    socket.on('disconnect', () => {
      logger.info(`[/portfolio] Client disconnected: ${socket.id}`);
    });
  });
}
