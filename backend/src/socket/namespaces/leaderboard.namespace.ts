import { Namespace } from 'socket.io';
import { logger } from '../../utils/logger';
import { SOCKET_EVENTS } from '../../constants';

/**
 * /leaderboard namespace
 * Phase 3: Will broadcast live leaderboard rankings every N seconds.
 */
export function registerLeaderboardNamespace(nsp: Namespace): void {
  nsp.on('connection', (socket) => {
    logger.info(`[/leaderboard] Client connected: ${socket.id}`);

    // Placeholder: emit a sample leaderboard snapshot
    socket.emit(SOCKET_EVENTS.LEADERBOARD_UPDATE, [
      { rank: 1, name: 'Alice', portfolioValue: 1150000, pnlPercentage: 15.0 },
      { rank: 2, name: 'Bob', portfolioValue: 1093000, pnlPercentage: 9.3 },
      { rank: 3, name: 'Charlie', portfolioValue: 1080000, pnlPercentage: 8.0 },
    ]);

    socket.on('disconnect', () => {
      logger.info(`[/leaderboard] Client disconnected: ${socket.id}`);
    });
  });
}
