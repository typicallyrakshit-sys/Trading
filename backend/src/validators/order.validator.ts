import { z } from 'zod';
import { SYMBOLS } from '../constants';

export const createOrderSchema = z.object({
  body: z.object({
    symbol: z.enum(SYMBOLS, {
      errorMap: () => ({ message: `Symbol must be one of: ${SYMBOLS.join(', ')}` }),
    }),
    side: z.enum(['BUY', 'SELL'], {
      errorMap: () => ({ message: 'Side must be BUY or SELL' }),
    }),
    type: z.enum(['MARKET', 'LIMIT', 'STOP']).default('MARKET'),
    quantity: z
      .number({ required_error: 'Quantity is required' })
      .positive('Quantity must be positive')
      .max(1_000_000, 'Quantity too large'),
    price: z
      .number({ required_error: 'Price is required' })
      .positive('Price must be positive'),
  }),
});

export const getOrdersQuerySchema = z.object({
  query: z.object({
    symbol: z.enum(SYMBOLS).optional(),
    side: z.enum(['BUY', 'SELL']).optional(),
    status: z.enum(['PENDING', 'FILLED', 'CANCELLED']).optional(),
    page: z.string().optional().transform((v) => (v ? parseInt(v, 10) : 1)),
    limit: z.string().optional().transform((v) => (v ? parseInt(v, 10) : 20)),
  }),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>['body'];
export type GetOrdersQuery = z.infer<typeof getOrdersQuerySchema>['query'];
