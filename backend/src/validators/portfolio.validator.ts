import { z } from 'zod';

export const portfolioQuerySchema = z.object({
  query: z.object({
    userId: z.string().optional(),
  }),
});

export const updatePortfolioSchema = z.object({
  body: z.object({
    cashBalance: z.number().nonnegative().optional(),
    portfolioValue: z.number().nonnegative().optional(),
    unrealizedPnL: z.number().optional(),
    realizedPnL: z.number().optional(),
  }),
});

export type PortfolioQuery = z.infer<typeof portfolioQuerySchema>['query'];
export type UpdatePortfolioInput = z.infer<typeof updatePortfolioSchema>['body'];
