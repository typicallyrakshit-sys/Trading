"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
exports.connectDatabase = connectDatabase;
exports.disconnectDatabase = disconnectDatabase;
exports.checkDatabaseHealth = checkDatabaseHealth;
const prisma_1 = require("../generated/prisma");
const logger_1 = require("../utils/logger");
const createPrismaClient = () => {
    return new prisma_1.PrismaClient({
        log: process.env.NODE_ENV === 'development'
            ? [{ emit: 'event', level: 'query' }, 'error', 'warn']
            : ['error'],
    });
};
// Singleton pattern — reuse in dev (hot reload)
exports.prisma = globalThis.__prisma ?? createPrismaClient();
if (process.env.NODE_ENV !== 'production') {
    globalThis.__prisma = exports.prisma;
}
async function connectDatabase() {
    try {
        await exports.prisma.$connect();
        logger_1.logger.info('✅ Database connected successfully');
    }
    catch (error) {
        logger_1.logger.error('❌ Database connection failed:', error);
        throw error;
    }
}
async function disconnectDatabase() {
    await exports.prisma.$disconnect();
    logger_1.logger.info('📴 Database disconnected');
}
async function checkDatabaseHealth() {
    try {
        await exports.prisma.$queryRaw `SELECT 1`;
        return true;
    }
    catch {
        return false;
    }
}
//# sourceMappingURL=database.js.map