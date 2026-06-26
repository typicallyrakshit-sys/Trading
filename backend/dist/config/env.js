"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), '.env') });
const envSchema = zod_1.z.object({
    PORT: zod_1.z
        .string()
        .default('5000')
        .transform((val) => parseInt(val, 10)),
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    DATABASE_URL: zod_1.z.string().min(1, 'DATABASE_URL is required'),
    JWT_SECRET: zod_1.z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
    JWT_EXPIRES_IN: zod_1.z.string().default('7d'),
    FIREBASE_PROJECT_ID: zod_1.z.string().optional().default(''),
    FIREBASE_CLIENT_EMAIL: zod_1.z.string().optional().default(''),
    FIREBASE_PRIVATE_KEY: zod_1.z.string().optional().default(''),
    REDIS_URL: zod_1.z.string().default('redis://localhost:6379'),
    BINANCE_WS_URL: zod_1.z
        .string()
        .default('wss://stream.binance.com:9443/ws'),
    CLIENT_URL: zod_1.z.string().default('http://localhost:3000'),
    RATE_LIMIT_WINDOW_MS: zod_1.z
        .string()
        .default('900000')
        .transform((val) => parseInt(val, 10)),
    RATE_LIMIT_MAX: zod_1.z
        .string()
        .default('100')
        .transform((val) => parseInt(val, 10)),
    LOG_LEVEL: zod_1.z.enum(['error', 'warn', 'info', 'debug']).default('info'),
    LOG_DIR: zod_1.z.string().default('logs'),
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error('❌ Invalid environment variables:');
    console.error(JSON.stringify(parsed.error.flatten().fieldErrors, null, 2));
    process.exit(1);
}
exports.env = parsed.data;
//# sourceMappingURL=env.js.map