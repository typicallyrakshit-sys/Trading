// Re-export Prisma enums as plain TypeScript types
export type Role = 'ADMIN' | 'PARTICIPANT';
export type OrderSide = 'BUY' | 'SELL';
export type OrderStatus = 'PENDING' | 'FILLED' | 'CANCELLED';
export type CompetitionStatus = 'UPCOMING' | 'LIVE' | 'PAUSED' | 'ENDED';
export type OrderType = 'MARKET' | 'LIMIT' | 'STOP';

// Environment type
export type NodeEnv = 'development' | 'production' | 'test';

// Generic service result
export type ServiceResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; statusCode: number };

// Socket namespace types
export type SocketNamespace = '/market' | '/orders' | '/portfolio' | '/leaderboard' | '/admin';

// Trading pair
export type TradingPair = {
  baseAsset: string;
  quoteAsset: string;
  symbol: string;
};

// Timestamp helper type
export type WithTimestamp<T> = T & {
  createdAt: Date;
  updatedAt: Date;
};
