import { LeaderboardEntry } from '../interfaces';
export declare class LeaderboardService {
    getLeaderboard(limit?: number): Promise<LeaderboardEntry[]>;
    getUserRank(userId: string): Promise<number | null>;
    refreshLeaderboard(): Promise<void>;
}
export declare const leaderboardService: LeaderboardService;
//# sourceMappingURL=leaderboard.service.d.ts.map