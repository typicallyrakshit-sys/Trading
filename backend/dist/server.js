"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const http_1 = __importDefault(require("http"));
const app_1 = require("./app");
const env_1 = require("./config/env");
const logger_1 = require("./utils/logger");
const database_1 = require("./config/database");
const index_1 = require("./socket/index");
const index_2 = require("./jobs/index");
const constants_1 = require("./constants");
async function bootstrap() {
    // 1. Connect database
    await (0, database_1.connectDatabase)();
    // 2. Create Express app
    const app = (0, app_1.createApp)();
    // 3. Create HTTP server
    const httpServer = http_1.default.createServer(app);
    // 4. Initialize Socket.IO
    (0, index_1.initializeSocketIO)(httpServer);
    // 5. Start background jobs
    (0, index_2.startJobs)();
    // 6. Start listening
    httpServer.listen(env_1.env.PORT, () => {
        logger_1.logger.info('═══════════════════════════════════════════════');
        logger_1.logger.info(' NYDC Crypto Trading Championship — Backend');
        logger_1.logger.info(`🚀 Server running on port ${env_1.env.PORT}`);
        logger_1.logger.info(`🌏 Environment: ${env_1.env.NODE_ENV}`);
        logger_1.logger.info(`📊 API Base: http://localhost:${env_1.env.PORT}${constants_1.API_PREFIX}`);
        logger_1.logger.info(`❤️  Health: http://localhost:${env_1.env.PORT}${constants_1.API_PREFIX}/health`);
        logger_1.logger.info('📡 Socket.IO ready on all namespaces');
        logger_1.logger.info('═══════════════════════════════════════════════');
    });
    // ---- Graceful shutdown ----
    const shutdown = async (signal) => {
        logger_1.logger.warn(`\n[${signal}] Graceful shutdown initiated...`);
        (0, index_2.stopJobs)();
        httpServer.close(async () => {
            logger_1.logger.info('HTTP server closed.');
            await (0, database_1.disconnectDatabase)();
            logger_1.logger.info('Database disconnected. Bye!');
            process.exit(0);
        });
        // Force exit after 10 seconds
        setTimeout(() => {
            logger_1.logger.error('Forced exit after timeout.');
            process.exit(1);
        }, 10_000);
    };
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('unhandledRejection', (reason) => {
        logger_1.logger.error('Unhandled Promise Rejection:', reason);
    });
    process.on('uncaughtException', (err) => {
        logger_1.logger.error('Uncaught Exception:', err);
        process.exit(1);
    });
}
bootstrap().catch((err) => {
    console.error('Bootstrap failed:', err);
    process.exit(1);
});
//# sourceMappingURL=server.js.map