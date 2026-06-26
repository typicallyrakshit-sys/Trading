import { Namespace } from 'socket.io';
import { logger } from '../../utils/logger';
import { SOCKET_EVENTS } from '../../constants';

/**
 * /orders namespace
 * Phase 3: Will broadcast real-time order status updates to authenticated users.
 */
export function registerOrdersNamespace(nsp: Namespace): void {
  nsp.on('connection', (socket) => {
    logger.info(`[/orders] Client connected: ${socket.id}`);

    socket.on('join:user', (userId: string) => {
      socket.join(`user:${userId}`);
      logger.info(`[/orders] ${socket.id} joined room user:${userId}`);
    });

    // Placeholder: send a sample order update
    socket.emit(SOCKET_EVENTS.ORDER_UPDATE, {
      orderId: 'sample-order-id',
      status: 'FILLED',
      timestamp: new Date().toISOString(),
    });

    socket.on('disconnect', () => {
      logger.info(`[/orders] Client disconnected: ${socket.id}`);
    });
  });
}
