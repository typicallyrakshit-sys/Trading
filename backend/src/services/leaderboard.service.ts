import { leaderboardRepository } from '../repositories/leaderboard.repository';
import { LeaderboardEntry } from '../interfaces';

export class LeaderboardService {
  async getLeaderboard(limit = 10): Promise<LeaderboardEntry[]> {
    const entries = await leaderboardRepository.findAll(limit);
    return entries.map((entry) => ({
      rank: entry.rank,
      userId: entry.userId,
      name: entry.user.name,
      avatar: entry.user.avatar,
      portfolioValue: entry.portfolioValue,
      pnlPercentage: parseFloat(
        (((entry.portfolioValue - 1_000_000) / 1_000_000) * 100).toFixed(2),
      ),
    }));
  }

  async getUserRank(userId: string): Promise<number | null> {
    const entry = await leaderboardRepository.findByUserId(userId);
    return entry?.rank ?? null;
  }

  async refreshLeaderboard(): Promise<void> {
    await leaderboardRepository.recalculate();
  }
}

export const leaderboardService = new LeaderboardService();
