import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../interfaces';
import { ApiError } from '../utils/ApiError';
import { asyncHandler } from '../utils/asyncHandler';

/**
 * Authentication middleware placeholder.
 * Phase 3 will integrate Firebase Admin SDK here.
 * For now it validates the presence of a Bearer token header.
 */
export const authenticate = asyncHandler(
  async (req: AuthenticatedRequest, _res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw ApiError.unauthorized('Missing or malformed Authorization header');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw ApiError.unauthorized('Token not provided');
    }

    // Phase 3: Verify Firebase ID token via Firebase Admin SDK
    // const decodedToken = await admin.auth().verifyIdToken(token);
    // Attach user to request
    req.user = {
      id: 'placeholder-user-id',
      email: 'placeholder@nydc.in',
      role: 'PARTICIPANT',
      firebaseUid: token,
    };

    next();
  },
);
