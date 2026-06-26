export declare const API_PREFIX = "/api/v1";
export declare const ROUTES: {
    readonly HEALTH: "/health";
    readonly USERS: "/users";
    readonly ORDERS: "/orders";
    readonly PORTFOLIO: "/portfolio";
    readonly LEADERBOARD: "/leaderboard";
    readonly COMPETITION: "/competition";
    readonly ADMIN: "/admin";
};
export declare const COMPETITION_STATUS: {
    readonly UPCOMING: "UPCOMING";
    readonly LIVE: "LIVE";
    readonly PAUSED: "PAUSED";
    readonly ENDED: "ENDED";
};
export declare const ORDER_STATUS: {
    readonly PENDING: "PENDING";
    readonly FILLED: "FILLED";
    readonly CANCELLED: "CANCELLED";
};
export declare const ORDER_SIDE: {
    readonly BUY: "BUY";
    readonly SELL: "SELL";
};
export declare const ROLES: {
    readonly ADMIN: "ADMIN";
    readonly PARTICIPANT: "PARTICIPANT";
};
export declare const DEFAULT_BALANCE = 1000000;
export declare const SYMBOLS: readonly ["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "XRPUSDT", "DOGEUSDT", "ADAUSDT", "AVAXUSDT"];
export type TradingSymbol = (typeof SYMBOLS)[number];
export declare const SOCKET_EVENTS: {
    readonly CONNECT: "connect";
    readonly DISCONNECT: "disconnect";
    readonly MARKET_TICK: "market:tick";
    readonly ORDER_UPDATE: "order:update";
    readonly PORTFOLIO_UPDATE: "portfolio:update";
    readonly LEADERBOARD_UPDATE: "leaderboard:update";
    readonly ADMIN_STATS: "admin:stats";
    readonly ERROR: "error";
};
export declare const SOCKET_NAMESPACES: {
    readonly MARKET: "/market";
    readonly ORDERS: "/orders";
    readonly PORTFOLIO: "/portfolio";
    readonly LEADERBOARD: "/leaderboard";
    readonly ADMIN: "/admin";
};
export declare const HTTP_STATUS: {
    readonly OK: 200;
    readonly CREATED: 201;
    readonly BAD_REQUEST: 400;
    readonly UNAUTHORIZED: 401;
    readonly FORBIDDEN: 403;
    readonly NOT_FOUND: 404;
    readonly CONFLICT: 409;
    readonly TOO_MANY_REQUESTS: 429;
    readonly INTERNAL_SERVER_ERROR: 500;
};
//# sourceMappingURL=index.d.ts.map