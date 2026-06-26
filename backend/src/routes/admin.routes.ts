import { Router } from 'express';
import { getAdminStats } from '../controllers/admin.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { requireAdmin } from '../middlewares/admin.middleware';

const router = Router();

// GET /api/v1/admin/stats
router.get('/stats', authenticate, requireAdmin, getAdminStats);

export default router;
