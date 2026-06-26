import { Response } from 'express';
import { AuthenticatedRequest } from '../interfaces';
import { portfolioService } from '../services/portfolio.service';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';

export const getPortfolio = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id ?? 'placeholder-user-id';
  const portfolio = await portfolioService.getUserPortfolio(userId);
  ApiResponse.ok(res, 'Portfolio retrieved', portfolio);
});

export const getPortfolioSummary = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id ?? 'placeholder-user-id';
  const summary = await portfolioService.getPortfolioSummary(userId);
  ApiResponse.ok(res, 'Portfolio summary retrieved', summary);
});
