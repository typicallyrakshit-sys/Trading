import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { env } from '../config/env';
import { logger } from '../utils/logger';
import { SOCKET_NAMESPACES } from '../constants';
import { registerMarketNamespace } from './namespaces/market.namespace';
import { registerOrdersNamespace } from './namespaces/orders.namespace';
import { registerPortfolioNamespace } from './namespaces/portfolio.namespace';
import { registerLeaderboardNamespace } from './namespaces/leaderboard.namespace';
import { registerAdminNamespace } from './namespaces/admin.namespace';

let io: SocketIOServer;

export function initializeSocketIO(httpServer: HTTPServer): SocketIOServer {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: env.CLIENT_URL,
      methods: ['GET', 'POST'],
      credentials: true,
    },
    pingTimeout: 60000,
    pingInterval: 25000,
    transports: ['websocket', 'polling'],
  });

  io.on('connection', (socket) => {
    logger.info(`🔌 Socket connected: ${socket.id}`);
    socket.on('disconnect', (reason) => {
      logger.info(`🔔 Socket disconnected: ${socket.id} — ${reason}`);
    });
  });

  // Register namespaces
  registerMarketNamespace(io.of(SOCKET_NAMESPACES.MARKET));
  registerOrdersNamespace(io.of(SOCKET_NAMESPACES.ORDERS));
  registerPortfolioNamespace(io.of(SOCKET_NAMESPACES.PORTFOLIO));
  registerLeaderboardNamespace(io.of(SOCKET_NAMESPACES.LEADERBOARD));
  registerAdminNamespace(io.of(SOCKET_NAMESPACES.ADMIN));

  logger.info('📡 Socket.IO initialized with namespaces: ' + Object.values(SOCKET_NAMESPACES).join(', '));

  return io;
}

export function getIO(): SocketIOServer {
  if (!io) throw new Error('Socket.IO not initialized. Call initializeSocketIO first.');
  return io;
}
