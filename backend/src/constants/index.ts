// API Routes
export const API_PREFIX = '/api/v1';

export const ROUTES = {
  HEALTH: '/health',
  USERS: '/users',
  ORDERS: '/orders',
  PORTFOLIO: '/portfolio',
  LEADERBOARD: '/leaderboard',
  COMPETITION: '/competition',
  ADMIN: '/admin',
} as const;

// Competition Status
export const COMPETITION_STATUS = {
  UPCOMING: 'UPCOMING',
  LIVE: 'LIVE',
  PAUSED: 'PAUSED',
  ENDED: 'ENDED',
} as const;

// Order Status
export const ORDER_STATUS = {
  PENDING: 'PENDING',
  FILLED: 'FILLED',
  CANCELLED: 'CANCELLED',
} as const;

// Order Sides
export const ORDER_SIDE = {
  BUY: 'BUY',
  SELL: 'SELL',
} as const;

// User Roles
export const ROLES = {
  ADMIN: 'ADMIN',
  PARTICIPANT: 'PARTICIPANT',
} as const;

// Default Balance (INR)
export const DEFAULT_BALANCE = 1_000_000;

// Trading Symbols
export const SYMBOLS = [
  'BTCUSDT',
  'ETHUSDT',
  'SOLUSDT',
  'BNBUSDT',
  'XRPUSDT',
  'DOGEUSDT',
  'ADAUSDT',
  'AVAXUSDT',
] as const;

export type TradingSymbol = (typeof SYMBOLS)[number];

// Socket Events
export const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  MARKET_TICK: 'market:tick',
  ORDER_UPDATE: 'order:update',
  PORTFOLIO_UPDATE: 'portfolio:update',
  LEADERBOARD_UPDATE: 'leaderboard:update',
  ADMIN_STATS: 'admin:stats',
  ERROR: 'error',
} as const;

// Socket Namespaces
export const SOCKET_NAMESPACES = {
  MARKET: '/market',
  ORDERS: '/orders',
  PORTFOLIO: '/portfolio',
  LEADERBOARD: '/leaderboard',
  ADMIN: '/admin',
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;
