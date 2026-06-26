import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../interfaces';
import { userService } from '../services/user.service';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';

export const getProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id ?? 'placeholder-user-id';
  const user = await userService.getUserById(userId);
  ApiResponse.ok(res, 'User profile retrieved', user);
});

export const getAllUsers = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const result = await userService.getAllUsers(page, limit);
  ApiResponse.ok(res, 'Users retrieved', result.data, {
    total: result.total,
    page: result.page,
    totalPages: result.totalPages,
  });
});
