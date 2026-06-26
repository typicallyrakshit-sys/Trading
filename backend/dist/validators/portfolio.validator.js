"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePortfolioSchema = exports.portfolioQuerySchema = void 0;
const zod_1 = require("zod");
exports.portfolioQuerySchema = zod_1.z.object({
    query: zod_1.z.object({
        userId: zod_1.z.string().optional(),
    }),
});
exports.updatePortfolioSchema = zod_1.z.object({
    body: zod_1.z.object({
        cashBalance: zod_1.z.number().nonnegative().optional(),
        portfolioValue: zod_1.z.number().nonnegative().optional(),
        unrealizedPnL: zod_1.z.number().optional(),
        realizedPnL: zod_1.z.number().optional(),
    }),
});
//# sourceMappingURL=portfolio.validator.js.map