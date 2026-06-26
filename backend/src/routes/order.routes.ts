import { Router } from 'express';
import { placeOrder, getUserOrders, cancelOrder } from '../controllers/order.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/requestValidator.middleware';
import { createOrderSchema } from '../validators/order.validator';
import { orderRateLimiter } from '../middlewares/rateLimiter.middleware';

const router = Router();

// POST /api/v1/orders
router.post('/', authenticate, orderRateLimiter, validate(createOrderSchema), placeOrder);

// GET /api/v1/orders
router.get('/', authenticate, getUserOrders);

// DELETE /api/v1/orders/:id
router.delete('/:id', authenticate, cancelOrder);

export default router;
