"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const path_1 = __importDefault(require("path"));
const env_1 = require("../config/env");
const LOG_DIR = path_1.default.resolve(process.cwd(), env_1.env.LOG_DIR);
const { combine, timestamp, printf, colorize, errors, json } = winston_1.default.format;
const consoleFormat = printf(({ level, message, timestamp: ts, stack }) => {
    return `${ts} [${level}]: ${stack ?? message}`;
});
const fileTransportOptions = {
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
};
exports.logger = winston_1.default.createLogger({
    level: env_1.env.LOG_LEVEL,
    format: combine(errors({ stack: true }), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), json()),
    transports: [
        // Console transport
        new winston_1.default.transports.Console({
            format: combine(colorize({ all: true }), timestamp({ format: 'HH:mm:ss' }), errors({ stack: true }), consoleFormat),
        }),
        // Daily rotate — info logs
        new winston_daily_rotate_file_1.default({
            ...fileTransportOptions,
            filename: path_1.default.join(LOG_DIR, 'application-%DATE%.log'),
            level: 'info',
        }),
        // Daily rotate — error logs
        new winston_daily_rotate_file_1.default({
            ...fileTransportOptions,
            filename: path_1.default.join(LOG_DIR, 'error-%DATE%.log'),
            level: 'error',
        }),
    ],
    exceptionHandlers: [
        new winston_daily_rotate_file_1.default({
            ...fileTransportOptions,
            filename: path_1.default.join(LOG_DIR, 'exceptions-%DATE%.log'),
        }),
    ],
    rejectionHandlers: [
        new winston_daily_rotate_file_1.default({
            ...fileTransportOptions,
            filename: path_1.default.join(LOG_DIR, 'rejections-%DATE%.log'),
        }),
    ],
});
//# sourceMappingURL=logger.js.map