"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_STATUS = exports.SOCKET_NAMESPACES = exports.SOCKET_EVENTS = exports.SYMBOLS = exports.DEFAULT_BALANCE = exports.ROLES = exports.ORDER_SIDE = exports.ORDER_STATUS = exports.COMPETITION_STATUS = exports.ROUTES = exports.API_PREFIX = void 0;
// API Routes
exports.API_PREFIX = '/api/v1';
exports.ROUTES = {
    HEALTH: '/health',
    USERS: '/users',
    ORDERS: '/orders',
    PORTFOLIO: '/portfolio',
    LEADERBOARD: '/leaderboard',
    COMPETITION: '/competition',
    ADMIN: '/admin',
};
// Competition Status
exports.COMPETITION_STATUS = {
    UPCOMING: 'UPCOMING',
    LIVE: 'LIVE',
    PAUSED: 'PAUSED',
    ENDED: 'ENDED',
};
// Order Status
exports.ORDER_STATUS = {
    PENDING: 'PENDING',
    FILLED: 'FILLED',
    CANCELLED: 'CANCELLED',
};
// Order Sides
exports.ORDER_SIDE = {
    BUY: 'BUY',
    SELL: 'SELL',
};
// User Roles
exports.ROLES = {
    ADMIN: 'ADMIN',
    PARTICIPANT: 'PARTICIPANT',
};
// Default Balance (INR)
exports.DEFAULT_BALANCE = 1_000_000;
// Trading Symbols
exports.SYMBOLS = [
    'BTCUSDT',
    'ETHUSDT',
    'SOLUSDT',
    'BNBUSDT',
    'XRPUSDT',
    'DOGEUSDT',
    'ADAUSDT',
    'AVAXUSDT',
];
// Socket Events
exports.SOCKET_EVENTS = {
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    MARKET_TICK: 'market:tick',
    ORDER_UPDATE: 'order:update',
    PORTFOLIO_UPDATE: 'portfolio:update',
    LEADERBOARD_UPDATE: 'leaderboard:update',
    ADMIN_STATS: 'admin:stats',
    ERROR: 'error',
};
// Socket Namespaces
exports.SOCKET_NAMESPACES = {
    MARKET: '/market',
    ORDERS: '/orders',
    PORTFOLIO: '/portfolio',
    LEADERBOARD: '/leaderboard',
    ADMIN: '/admin',
};
// HTTP Status Codes
exports.HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
};
//# sourceMappingURL=index.js.map