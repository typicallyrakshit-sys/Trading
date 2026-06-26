"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.portfolioRepository = exports.PortfolioRepository = void 0;
const database_1 = require("../config/database");
class PortfolioRepository {
    async findByUserId(userId) {
        return database_1.prisma.portfolio.findUnique({ where: { userId } });
    }
    async upsert(userId, data) {
        return database_1.prisma.portfolio.upsert({
            where: { userId },
            update: data,
            create: {
                userId,
                cashBalance: data.cashBalance ?? 1_000_000,
                portfolioValue: data.portfolioValue ?? 1_000_000,
                unrealizedPnL: data.unrealizedPnL ?? 0,
                realizedPnL: data.realizedPnL ?? 0,
            },
        });
    }
    async findTopByValue(limit = 10) {
        return database_1.prisma.portfolio.findMany({
            orderBy: { portfolioValue: 'desc' },
            take: limit,
            include: { user: true },
        });
    }
}
exports.PortfolioRepository = PortfolioRepository;
exports.portfolioRepository = new PortfolioRepository();
//# sourceMappingURL=portfolio.repository.js.map