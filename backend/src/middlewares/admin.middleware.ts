import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../interfaces';
import { ApiError } from '../utils/ApiError';
import { asyncHandler } from '../utils/asyncHandler';

/**
 * Admin authorization middleware.
 * Must be used AFTER authenticate middleware.
 */
export const requireAdmin = asyncHandler(
  async (req: AuthenticatedRequest, _res: Response, next: NextFunction): Promise<void> => {
    if (!req.user) {
      throw ApiError.unauthorized('Not authenticated');
    }

    if (req.user.role !== 'ADMIN') {
      throw ApiError.forbidden('Administrator access required');
    }

    next();
  },
);
