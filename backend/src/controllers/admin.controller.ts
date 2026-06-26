import { Request, Response } from 'express';
import { userService } from '../services/user.service';
import { orderService } from '../services/order.service';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';
import { checkDatabaseHealth } from '../config/database';

export const getAdminStats = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
  const [totalUsers, totalOrders, dbHealthy] = await Promise.all([
    userService.getTotalUserCount(),
    orderService.getTotalOrderCount(),
    checkDatabaseHealth(),
  ]);

  ApiResponse.ok(res, 'Admin stats retrieved', {
    totalUsers,
    totalOrders,
    database: dbHealthy ? 'healthy' : 'unhealthy',
    serverUptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});
