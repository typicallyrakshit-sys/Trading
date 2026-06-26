import { Request } from 'express';
export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
        role: string;
        firebaseUid?: string;
    };
}
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
export interface PaginationParams {
    page: number;
    limit: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
export interface HealthCheckResponse {
    status: 'ok' | 'error';
    server: 'running' | 'stopped';
    database: 'connected' | 'disconnected';
    timestamp: string;
    uptime: number;
    version: string;
}
export interface PortfolioSummary {
    cashBalance: number;
    portfolioValue: number;
    unrealizedPnL: number;
    realizedPnL: number;
    totalPnL: number;
    returnPercentage: number;
}
export interface LeaderboardEntry {
    rank: number;
    userId: string;
    name: string;
    avatar: string | null;
    portfolioValue: number;
    pnlPercentage: number;
}
export interface MarketTick {
    symbol: string;
    price: number;
    change24h: number;
    changePercent24h: number;
    high24h: number;
    low24h: number;
    volume24h: number;
    timestamp: string;
}
export interface OrderPayload {
    symbol: string;
    side: 'BUY' | 'SELL';
    quantity: number;
    price: number;
    type: 'MARKET' | 'LIMIT' | 'STOP';
}
//# sourceMappingURL=index.d.ts.map