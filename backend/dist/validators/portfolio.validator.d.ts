import { z } from 'zod';
export declare const portfolioQuerySchema: z.ZodObject<{
    query: z.ZodObject<{
        userId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        userId?: string | undefined;
    }, {
        userId?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        userId?: string | undefined;
    };
}, {
    query: {
        userId?: string | undefined;
    };
}>;
export declare const updatePortfolioSchema: z.ZodObject<{
    body: z.ZodObject<{
        cashBalance: z.ZodOptional<z.ZodNumber>;
        portfolioValue: z.ZodOptional<z.ZodNumber>;
        unrealizedPnL: z.ZodOptional<z.ZodNumber>;
        realizedPnL: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        cashBalance?: number | undefined;
        portfolioValue?: number | undefined;
        unrealizedPnL?: number | undefined;
        realizedPnL?: number | undefined;
    }, {
        cashBalance?: number | undefined;
        portfolioValue?: number | undefined;
        unrealizedPnL?: number | undefined;
        realizedPnL?: number | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        cashBalance?: number | undefined;
        portfolioValue?: number | undefined;
        unrealizedPnL?: number | undefined;
        realizedPnL?: number | undefined;
    };
}, {
    body: {
        cashBalance?: number | undefined;
        portfolioValue?: number | undefined;
        unrealizedPnL?: number | undefined;
        realizedPnL?: number | undefined;
    };
}>;
export type PortfolioQuery = z.infer<typeof portfolioQuerySchema>['query'];
export type UpdatePortfolioInput = z.infer<typeof updatePortfolioSchema>['body'];
//# sourceMappingURL=portfolio.validator.d.ts.map