import { z } from 'zod';

export const createCompetitionSchema = z.object({
  body: z.object({
    startTime: z.string().datetime({ message: 'Invalid datetime format' }),
    endTime: z.string().datetime({ message: 'Invalid datetime format' }),
  }),
});

export const updateCompetitionSchema = z.object({
  body: z.object({
    status: z.enum(['UPCOMING', 'LIVE', 'PAUSED', 'ENDED']).optional(),
    startTime: z.string().datetime().optional(),
    endTime: z.string().datetime().optional(),
  }),
});

export type CreateCompetitionInput = z.infer<typeof createCompetitionSchema>['body'];
export type UpdateCompetitionInput = z.infer<typeof updateCompetitionSchema>['body'];
