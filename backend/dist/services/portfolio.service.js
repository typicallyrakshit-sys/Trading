"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.portfolioService = exports.PortfolioService = void 0;
const portfolio_repository_1 = require("../repositories/portfolio.repository");
const ApiError_1 = require("../utils/ApiError");
const constants_1 = require("../constants");
class PortfolioService {
    async getUserPortfolio(userId) {
        const portfolio = await portfolio_repository_1.portfolioRepository.findByUserId(userId);
        if (!portfolio) {
            // Auto-initialize if missing
            return portfolio_repository_1.portfolioRepository.upsert(userId, {});
        }
        return portfolio;
    }
    async getPortfolioSummary(userId) {
        const portfolio = await this.getUserPortfolio(userId);
        const totalPnL = portfolio.realizedPnL + portfolio.unrealizedPnL;
        const returnPercentage = ((portfolio.portfolioValue - constants_1.DEFAULT_BALANCE) / constants_1.DEFAULT_BALANCE) * 100;
        return {
            cashBalance: portfolio.cashBalance,
            portfolioValue: portfolio.portfolioValue,
            unrealizedPnL: portfolio.unrealizedPnL,
            realizedPnL: portfolio.realizedPnL,
            totalPnL,
            returnPercentage: parseFloat(returnPercentage.toFixed(2)),
        };
    }
    async getTopPortfolios(limit = 10) {
        return portfolio_repository_1.portfolioRepository.findTopByValue(limit);
    }
    async initializePortfolio(userId) {
        const existing = await portfolio_repository_1.portfolioRepository.findByUserId(userId);
        if (existing)
            throw ApiError_1.ApiError.conflict('Portfolio already initialized for this user');
        return portfolio_repository_1.portfolioRepository.upsert(userId, {});
    }
}
exports.PortfolioService = PortfolioService;
exports.portfolioService = new PortfolioService();
//# sourceMappingURL=portfolio.service.js.map