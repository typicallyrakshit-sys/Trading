"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPortfolioSummary = exports.getPortfolio = void 0;
const portfolio_service_1 = require("../services/portfolio.service");
const ApiResponse_1 = require("../utils/ApiResponse");
const asyncHandler_1 = require("../utils/asyncHandler");
exports.getPortfolio = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const userId = req.user?.id ?? 'placeholder-user-id';
    const portfolio = await portfolio_service_1.portfolioService.getUserPortfolio(userId);
    ApiResponse_1.ApiResponse.ok(res, 'Portfolio retrieved', portfolio);
});
exports.getPortfolioSummary = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const userId = req.user?.id ?? 'placeholder-user-id';
    const summary = await portfolio_service_1.portfolioService.getPortfolioSummary(userId);
    ApiResponse_1.ApiResponse.ok(res, 'Portfolio summary retrieved', summary);
});
//# sourceMappingURL=portfolio.controller.js.map