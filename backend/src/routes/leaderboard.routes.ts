import { Router } from 'express';
import { getLeaderboard } from '../controllers/leaderboard.controller';

const router = Router();

// GET /api/v1/leaderboard — public
router.get('/', getLeaderboard);

export default router;
