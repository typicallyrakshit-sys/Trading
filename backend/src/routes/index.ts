import { Router } from 'express';
import { healthCheck } from '../controllers/health.controller';
import userRoutes from './user.routes';
import orderRoutes from './order.routes';
import portfolioRoutes from './portfolio.routes';
import leaderboardRoutes from './leaderboard.routes';
import competitionRoutes from './competition.routes';
import adminRoutes from './admin.routes';

const router = Router();

// Health check — no auth required
router.get('/health', healthCheck);

// Feature routes
router.use('/users', userRoutes);
router.use('/orders', orderRoutes);
router.use('/portfolio', portfolioRoutes);
router.use('/leaderboard', leaderboardRoutes);
router.use('/competition', competitionRoutes);
router.use('/admin', adminRoutes);

export default router;
