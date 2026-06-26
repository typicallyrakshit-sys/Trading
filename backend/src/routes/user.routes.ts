import { Router } from 'express';
import { getProfile, getAllUsers } from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// GET /api/v1/users/profile
router.get('/profile', authenticate, getProfile);

// GET /api/v1/users — admin only (auth placeholder)
router.get('/', authenticate, getAllUsers);

export default router;
