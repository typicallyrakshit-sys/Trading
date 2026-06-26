import { Request, Response } from 'express';
import { prisma } from '../config/database';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';

export const getCompetition = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
  const competition = await prisma.competition.findFirst({
    orderBy: { createdAt: 'desc' },
  });

  if (!competition) throw ApiError.notFound('No active competition found');

  ApiResponse.ok(res, 'Competition retrieved', competition);
});
