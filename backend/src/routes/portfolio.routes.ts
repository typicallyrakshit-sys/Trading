import { Router } from 'express';
import { getPortfolio, getPortfolioSummary } from '../controllers/portfolio.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

// GET /api/v1/portfolio
router.get('/', authenticate, getPortfolio);

// GET /api/v1/portfolio/summary
router.get('/summary', authenticate, getPortfolioSummary);

export default router;
