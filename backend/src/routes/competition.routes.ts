import { Router } from 'express';
import { getCompetition } from '../controllers/competition.controller';

const router = Router();

// GET /api/v1/competition — public
router.get('/', getCompetition);

export default router;
