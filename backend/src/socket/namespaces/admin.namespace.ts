import { Namespace } from 'socket.io';
import { logger } from '../../utils/logger';
import { SOCKET_EVENTS } from '../../constants';

/**
 * /admin namespace
 * Phase 3: Will stream admin-level stats (active users, order volume, etc.).
 */
export function registerAdminNamespace(nsp: Namespace): void {
  nsp.on('connection', (socket) => {
    logger.info(`[/admin] Admin client connected: ${socket.id}`);

    socket.emit(SOCKET_EVENTS.ADMIN_STATS, {
      activeConnections: 0,
      totalUsers: 0,
      totalOrders: 0,
      serverUptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });

    socket.on('disconnect', () => {
      logger.info(`[/admin] Admin client disconnected: ${socket.id}`);
    });
  });
}
