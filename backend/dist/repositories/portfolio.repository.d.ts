import { Portfolio } from '../generated/prisma';
export declare class PortfolioRepository {
    findByUserId(userId: string): Promise<Portfolio | null>;
    upsert(userId: string, data: Partial<{
        cashBalance: number;
        portfolioValue: number;
        unrealizedPnL: number;
        realizedPnL: number;
    }>): Promise<Portfolio>;
    findTopByValue(limit?: number): Promise<Portfolio[]>;
}
export declare const portfolioRepository: PortfolioRepository;
//# sourceMappingURL=portfolio.repository.d.ts.map