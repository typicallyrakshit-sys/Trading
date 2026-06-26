"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersQuerySchema = exports.createOrderSchema = void 0;
const zod_1 = require("zod");
const constants_1 = require("../constants");
exports.createOrderSchema = zod_1.z.object({
    body: zod_1.z.object({
        symbol: zod_1.z.enum(constants_1.SYMBOLS, {
            errorMap: () => ({ message: `Symbol must be one of: ${constants_1.SYMBOLS.join(', ')}` }),
        }),
        side: zod_1.z.enum(['BUY', 'SELL'], {
            errorMap: () => ({ message: 'Side must be BUY or SELL' }),
        }),
        type: zod_1.z.enum(['MARKET', 'LIMIT', 'STOP']).default('MARKET'),
        quantity: zod_1.z
            .number({ required_error: 'Quantity is required' })
            .positive('Quantity must be positive')
            .max(1_000_000, 'Quantity too large'),
        price: zod_1.z
            .number({ required_error: 'Price is required' })
            .positive('Price must be positive'),
    }),
});
exports.getOrdersQuerySchema = zod_1.z.object({
    query: zod_1.z.object({
        symbol: zod_1.z.enum(constants_1.SYMBOLS).optional(),
        side: zod_1.z.enum(['BUY', 'SELL']).optional(),
        status: zod_1.z.enum(['PENDING', 'FILLED', 'CANCELLED']).optional(),
        page: zod_1.z.string().optional().transform((v) => (v ? parseInt(v, 10) : 1)),
        limit: zod_1.z.string().optional().transform((v) => (v ? parseInt(v, 10) : 20)),
    }),
});
//# sourceMappingURL=order.validator.js.map