import { Response } from 'express';
import { AuthenticatedRequest } from '../interfaces';
import { orderService } from '../services/order.service';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { CreateOrderInput } from '../validators/order.validator';

export const placeOrder = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id ?? 'placeholder-user-id';
  const orderData: CreateOrderInput = req.body;
  const order = await orderService.createOrder(userId, orderData);
  ApiResponse.created(res, 'Order placed successfully', order);
});

export const getUserOrders = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id ?? 'placeholder-user-id';
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;
  const result = await orderService.getUserOrders(userId, {}, page, limit);
  ApiResponse.ok(res, 'Orders retrieved', result.data, {
    total: result.total,
    page: result.page,
    totalPages: result.totalPages,
  });
});

export const cancelOrder = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.id ?? 'placeholder-user-id';
  const { id } = req.params;
  const order = await orderService.cancelOrder(id, userId);
  ApiResponse.ok(res, 'Order cancelled', order);
});
