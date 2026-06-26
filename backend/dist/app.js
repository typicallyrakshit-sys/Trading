"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const env_1 = require("./config/env");
const logger_1 = require("./utils/logger");
const rateLimiter_middleware_1 = require("./middlewares/rateLimiter.middleware");
const error_middleware_1 = require("./middlewares/error.middleware");
const notFound_middleware_1 = require("./middlewares/notFound.middleware");
const constants_1 = require("./constants");
const index_1 = __importDefault(require("./routes/index"));
function createApp() {
    const app = (0, express_1.default)();
    // ---- Security headers ----
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: env_1.env.NODE_ENV === 'production',
        crossOriginEmbedderPolicy: false,
    }));
    // ---- CORS ----
    app.use((0, cors_1.default)({
        origin: env_1.env.CLIENT_URL,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }));
    // ---- Request parsing ----
    app.use(express_1.default.json({ limit: '10kb' }));
    app.use(express_1.default.urlencoded({ extended: true, limit: '10kb' }));
    app.use((0, cookie_parser_1.default)());
    // ---- Compression ----
    app.use((0, compression_1.default)());
    // ---- HTTP request logging ----
    if (env_1.env.NODE_ENV !== 'test') {
        app.use((0, morgan_1.default)('combined', {
            stream: {
                write: (message) => logger_1.logger.http(message.trim()),
            },
        }));
    }
    // ---- Rate limiting ----
    app.use(rateLimiter_middleware_1.globalRateLimiter);
    // ---- API routes ----
    app.use(constants_1.API_PREFIX, index_1.default);
    // ---- 404 handler ----
    app.use(notFound_middleware_1.notFoundHandler);
    // ---- Global error handler ----
    app.use(error_middleware_1.errorHandler);
    return app;
}
//# sourceMappingURL=app.js.map