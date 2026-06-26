import { prisma } from '../config/database';
import { Portfolio } from '../generated/prisma';

export class PortfolioRepository {
  async findByUserId(userId: string): Promise<Portfolio | null> {
    return prisma.portfolio.findUnique({ where: { userId } });
  }

  async upsert(
    userId: string,
    data: Partial<{
      cashBalance: number;
      portfolioValue: number;
      unrealizedPnL: number;
      realizedPnL: number;
    }>,
  ): Promise<Portfolio> {
    return prisma.portfolio.upsert({
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

  async findTopByValue(limit = 10): Promise<Portfolio[]> {
    return prisma.portfolio.findMany({
      orderBy: { portfolioValue: 'desc' },
      take: limit,
      include: { user: true },
    });
  }
}

export const portfolioRepository = new PortfolioRepository();
