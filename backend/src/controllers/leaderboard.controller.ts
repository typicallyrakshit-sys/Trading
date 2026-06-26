import { Request, Response } from 'express';
import { leaderboardService } from '../services/leaderboard.service';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';

export const getLeaderboard = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const limit = parseInt(req.query.limit as string) || 10;
  const entries = await leaderboardService.getLeaderboard(limit);
  ApiResponse.ok(res, 'Leaderboard retrieved', entries);
});
