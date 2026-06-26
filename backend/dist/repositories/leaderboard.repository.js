"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaderboardRepository = exports.LeaderboardRepository = void 0;
const database_1 = require("../config/database");
class LeaderboardRepository {
    async findAll(limit = 10) {
        return database_1.prisma.leaderboard.findMany({
            orderBy: { rank: 'asc' },
            take: limit,
            include: {
                user: {
                    select: { name: true, avatar: true },
                },
            },
        });
    }
    async findByUserId(userId) {
        return database_1.prisma.leaderboard.findUnique({ where: { userId } });
    }
    async upsert(userId, rank, portfolioValue) {
        return database_1.prisma.leaderboard.upsert({
            where: { userId },
            update: { rank, portfolioValue },
            create: { userId, rank, portfolioValue },
        });
    }
    async recalculate() {
        const portfolios = await database_1.prisma.portfolio.findMany({
            orderBy: { portfolioValue: 'desc' },
            include: { user: true },
        });
        await Promise.all(portfolios.map(async (p, index) => database_1.prisma.leaderboard.upsert({
            where: { userId: p.userId },
            update: { rank: index + 1, portfolioValue: p.portfolioValue },
            create: { userId: p.userId, rank: index + 1, portfolioValue: p.portfolioValue },
        })));
    }
}
exports.LeaderboardRepository = LeaderboardRepository;
exports.leaderboardRepository = new LeaderboardRepository();
//# sourceMappingURL=leaderboard.repository.js.map