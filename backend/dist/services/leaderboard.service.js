"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaderboardService = exports.LeaderboardService = void 0;
const leaderboard_repository_1 = require("../repositories/leaderboard.repository");
class LeaderboardService {
    async getLeaderboard(limit = 10) {
        const entries = await leaderboard_repository_1.leaderboardRepository.findAll(limit);
        return entries.map((entry) => ({
            rank: entry.rank,
            userId: entry.userId,
            name: entry.user.name,
            avatar: entry.user.avatar,
            portfolioValue: entry.portfolioValue,
            pnlPercentage: parseFloat((((entry.portfolioValue - 1_000_000) / 1_000_000) * 100).toFixed(2)),
        }));
    }
    async getUserRank(userId) {
        const entry = await leaderboard_repository_1.leaderboardRepository.findByUserId(userId);
        return entry?.rank ?? null;
    }
    async refreshLeaderboard() {
        await leaderboard_repository_1.leaderboardRepository.recalculate();
    }
}
exports.LeaderboardService = LeaderboardService;
exports.leaderboardService = new LeaderboardService();
//# sourceMappingURL=leaderboard.service.js.map