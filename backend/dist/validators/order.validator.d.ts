import { z } from 'zod';
export declare const createOrderSchema: z.ZodObject<{
    body: z.ZodObject<{
        symbol: z.ZodEnum<["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "XRPUSDT", "DOGEUSDT", "ADAUSDT", "AVAXUSDT"]>;
        side: z.ZodEnum<["BUY", "SELL"]>;
        type: z.ZodDefault<z.ZodEnum<["MARKET", "LIMIT", "STOP"]>>;
        quantity: z.ZodNumber;
        price: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        symbol: "BTCUSDT" | "ETHUSDT" | "SOLUSDT" | "BNBUSDT" | "XRPUSDT" | "DOGEUSDT" | "ADAUSDT" | "AVAXUSDT";
        type: "MARKET" | "LIMIT" | "STOP";
        side: "BUY" | "SELL";
        quantity: number;
        price: number;
    }, {
        symbol: "BTCUSDT" | "ETHUSDT" | "SOLUSDT" | "BNBUSDT" | "XRPUSDT" | "DOGEUSDT" | "ADAUSDT" | "AVAXUSDT";
        side: "BUY" | "SELL";
        quantity: number;
        price: number;
        type?: "MARKET" | "LIMIT" | "STOP" | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        symbol: "BTCUSDT" | "ETHUSDT" | "SOLUSDT" | "BNBUSDT" | "XRPUSDT" | "DOGEUSDT" | "ADAUSDT" | "AVAXUSDT";
        type: "MARKET" | "LIMIT" | "STOP";
        side: "BUY" | "SELL";
        quantity: number;
        price: number;
    };
}, {
    body: {
        symbol: "BTCUSDT" | "ETHUSDT" | "SOLUSDT" | "BNBUSDT" | "XRPUSDT" | "DOGEUSDT" | "ADAUSDT" | "AVAXUSDT";
        side: "BUY" | "SELL";
        quantity: number;
        price: number;
        type?: "MARKET" | "LIMIT" | "STOP" | undefined;
    };
}>;
export declare const getOrdersQuerySchema: z.ZodObject<{
    query: z.ZodObject<{
        symbol: z.ZodOptional<z.ZodEnum<["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT", "XRPUSDT", "DOGEUSDT", "ADAUSDT", "AVAXUSDT"]>>;
        side: z.ZodOptional<z.ZodEnum<["BUY", "SELL"]>>;
        status: z.ZodOptional<z.ZodEnum<["PENDING", "FILLED", "CANCELLED"]>>;
        page: z.ZodEffects<z.ZodOptional<z.ZodString>, number, string | undefined>;
        limit: z.ZodEffects<z.ZodOptional<z.ZodString>, number, string | undefined>;
    }, "strip", z.ZodTypeAny, {
        limit: number;
        page: number;
        symbol?: "BTCUSDT" | "ETHUSDT" | "SOLUSDT" | "BNBUSDT" | "XRPUSDT" | "DOGEUSDT" | "ADAUSDT" | "AVAXUSDT" | undefined;
        status?: "PENDING" | "FILLED" | "CANCELLED" | undefined;
        side?: "BUY" | "SELL" | undefined;
    }, {
        symbol?: "BTCUSDT" | "ETHUSDT" | "SOLUSDT" | "BNBUSDT" | "XRPUSDT" | "DOGEUSDT" | "ADAUSDT" | "AVAXUSDT" | undefined;
        status?: "PENDING" | "FILLED" | "CANCELLED" | undefined;
        limit?: string | undefined;
        page?: string | undefined;
        side?: "BUY" | "SELL" | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        limit: number;
        page: number;
        symbol?: "BTCUSDT" | "ETHUSDT" | "SOLUSDT" | "BNBUSDT" | "XRPUSDT" | "DOGEUSDT" | "ADAUSDT" | "AVAXUSDT" | undefined;
        status?: "PENDING" | "FILLED" | "CANCELLED" | undefined;
        side?: "BUY" | "SELL" | undefined;
    };
}, {
    query: {
        symbol?: "BTCUSDT" | "ETHUSDT" | "SOLUSDT" | "BNBUSDT" | "XRPUSDT" | "DOGEUSDT" | "ADAUSDT" | "AVAXUSDT" | undefined;
        status?: "PENDING" | "FILLED" | "CANCELLED" | undefined;
        limit?: string | undefined;
        page?: string | undefined;
        side?: "BUY" | "SELL" | undefined;
    };
}>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>['body'];
export type GetOrdersQuery = z.infer<typeof getOrdersQuerySchema>['query'];
//# sourceMappingURL=order.validator.d.ts.map