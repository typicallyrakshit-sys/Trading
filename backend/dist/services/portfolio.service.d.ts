import { Portfolio } from '../generated/prisma';
import { PortfolioSummary } from '../interfaces';
export declare class PortfolioService {
    getUserPortfolio(userId: string): Promise<Portfolio>;
    getPortfolioSummary(userId: string): Promise<PortfolioSummary>;
    getTopPortfolios(limit?: number): Promise<Portfolio[]>;
    initializePortfolio(userId: string): Promise<Portfolio>;
}
export declare const portfolioService: PortfolioService;
//# sourceMappingURL=portfolio.service.d.ts.map