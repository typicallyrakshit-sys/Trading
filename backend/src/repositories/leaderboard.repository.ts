import { prisma } from '../config/database';
import { Leaderboard } from '../generated/prisma';

export class LeaderboardRepository {
  async findAll(limit = 10): Promise<(Leaderboard & { user: { name: string; avatar: string | null } })[]> {
    return prisma.leaderboard.findMany({
      orderBy: { rank: 'asc' },
      take: limit,
      include: {
        user: {
          select: { name: true, avatar: true },
        },
      },
    }) as Promise<(Leaderboard & { user: { name: string; avatar: string | null } })[]>;
  }

  async findByUserId(userId: string): Promise<Leaderboard | null> {
    return prisma.leaderboard.findUnique({ where: { userId } });
  }

  async upsert(userId: string, rank: number, portfolioValue: number): Promise<Leaderboard> {
    return prisma.leaderboard.upsert({
      where: { userId },
      update: { rank, portfolioValue },
      create: { userId, rank, portfolioValue },
    });
  }

  async recalculate(): Promise<void> {
    const portfolios = await prisma.portfolio.findMany({
      orderBy: { portfolioValue: 'desc' },
      include: { user: true },
    });

    await Promise.all(
      portfolios.map(async (p, index) =>
        prisma.leaderboard.upsert({
          where: { userId: p.userId },
          update: { rank: index + 1, portfolioValue: p.portfolioValue },
          create: { userId: p.userId, rank: index + 1, portfolioValue: p.portfolioValue },
        }),
      ),
    );
  }
}

export const leaderboardRepository = new LeaderboardRepository();
