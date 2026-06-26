import { Request, Response } from 'express';
import { checkDatabaseHealth } from '../config/database';
import { ApiResponse } from '../utils/ApiResponse';
import { HealthCheckResponse } from '../interfaces';

export async function healthCheck(req: Request, res: Response): Promise<void> {
  const dbHealthy = await checkDatabaseHealth();

  const data: HealthCheckResponse = {
    status: 'ok',
    server: 'running',
    database: dbHealthy ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version ?? '1.0.0',
  };

  ApiResponse.ok(res, 'Health check passed', data);
}
