import 'dotenv/config';
import http from 'http';
import { createApp } from './app';
import { env } from './config/env';
import { logger } from './utils/logger';
import { connectDatabase, disconnectDatabase } from './config/database';
import { initializeSocketIO } from './socket/index';
import { startJobs, stopJobs } from './jobs/index';
import { API_PREFIX } from './constants';

async function bootstrap(): Promise<void> {
  // 1. Connect database
  await connectDatabase();

  // 2. Create Express app
  const app = createApp();

  // 3. Create HTTP server
  const httpServer = http.createServer(app);

  // 4. Initialize Socket.IO
  initializeSocketIO(httpServer);

  // 5. Start background jobs
  startJobs();

  // 6. Start listening
  httpServer.listen(env.PORT, () => {
    logger.info('═══════════════════════════════════════════════');
    logger.info(' NYDC Crypto Trading Championship — Backend');
    logger.info(`🚀 Server running on port ${env.PORT}`);
    logger.info(`🌏 Environment: ${env.NODE_ENV}`);
    logger.info(`📊 API Base: http://localhost:${env.PORT}${API_PREFIX}`);
    logger.info(`❤️  Health: http://localhost:${env.PORT}${API_PREFIX}/health`);
    logger.info('📡 Socket.IO ready on all namespaces');
    logger.info('═══════════════════════════════════════════════');
  });

  // ---- Graceful shutdown ----
  const shutdown = async (signal: string): Promise<void> => {
    logger.warn(`\n[${signal}] Graceful shutdown initiated...`);

    stopJobs();

    httpServer.close(async () => {
      logger.info('HTTP server closed.');
      await disconnectDatabase();
      logger.info('Database disconnected. Bye!');
      process.exit(0);
    });

    // Force exit after 10 seconds
    setTimeout(() => {
      logger.error('Forced exit after timeout.');
      process.exit(1);
    }, 10_000);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  process.on('unhandledRejection', (reason) => {
    logger.error('Unhandled Promise Rejection:', reason);
  });

  process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err);
    process.exit(1);
  });
}

bootstrap().catch((err) => {
  console.error('Bootstrap failed:', err);
  process.exit(1);
});
