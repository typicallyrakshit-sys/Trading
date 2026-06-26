export type Role = 'ADMIN' | 'PARTICIPANT';
export type OrderSide = 'BUY' | 'SELL';
export type OrderStatus = 'PENDING' | 'FILLED' | 'CANCELLED';
export type CompetitionStatus = 'UPCOMING' | 'LIVE' | 'PAUSED' | 'ENDED';
export type OrderType = 'MARKET' | 'LIMIT' | 'STOP';
export type NodeEnv = 'development' | 'production' | 'test';
export type ServiceResult<T> = {
    success: true;
    data: T;
} | {
    success: false;
    error: string;
    statusCode: number;
};
export type SocketNamespace = '/market' | '/orders' | '/portfolio' | '/leaderboard' | '/admin';
export type TradingPair = {
    baseAsset: string;
    quoteAsset: string;
    symbol: string;
};
export type WithTimestamp<T> = T & {
    createdAt: Date;
    updatedAt: Date;
};
//# sourceMappingURL=index.d.ts.map