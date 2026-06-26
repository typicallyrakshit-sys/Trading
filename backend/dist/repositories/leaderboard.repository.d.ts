import { Leaderboard } from '../generated/prisma';
export declare class LeaderboardRepository {
    findAll(limit?: number): Promise<(Leaderboard & {
        user: {
            name: string;
            avatar: string | null;
        };
    })[]>;
    findByUserId(userId: string): Promise<Leaderboard | null>;
    upsert(userId: string, rank: number, portfolioValue: number): Promise<Leaderboard>;
    recalculate(): Promise<void>;
}
export declare const leaderboardRepository: LeaderboardRepository;
//# sourceMappingURL=leaderboard.repository.d.ts.map