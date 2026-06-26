import { Portfolio } from '../generated/prisma';
import { portfolioRepository } from '../repositories/portfolio.repository';
import { ApiError } from '../utils/ApiError';
import { PortfolioSummary } from '../interfaces';
import { DEFAULT_BALANCE } from '../constants';

export class PortfolioService {
  async getUserPortfolio(userId: string): Promise<Portfolio> {
    const portfolio = await portfolioRepository.findByUserId(userId);
    if (!portfolio) {
      // Auto-initialize if missing
      return portfolioRepository.upsert(userId, {});
    }
    return portfolio;
  }

  async getPortfolioSummary(userId: string): Promise<PortfolioSummary> {
    const portfolio = await this.getUserPortfolio(userId);
    const totalPnL = portfolio.realizedPnL + portfolio.unrealizedPnL;
    const returnPercentage = ((portfolio.portfolioValue - DEFAULT_BALANCE) / DEFAULT_BALANCE) * 100;

    return {
      cashBalance: portfolio.cashBalance,
      portfolioValue: portfolio.portfolioValue,
      unrealizedPnL: portfolio.unrealizedPnL,
      realizedPnL: portfolio.realizedPnL,
      totalPnL,
      returnPercentage: parseFloat(returnPercentage.toFixed(2)),
    };
  }

  async getTopPortfolios(limit = 10): Promise<Portfolio[]> {
    return portfolioRepository.findTopByValue(limit);
  }

  async initializePortfolio(userId: string): Promise<Portfolio> {
    const existing = await portfolioRepository.findByUserId(userId);
    if (existing) throw ApiError.conflict('Portfolio already initialized for this user');
    return portfolioRepository.upsert(userId, {});
  }
}

export const portfolioService = new PortfolioService();
