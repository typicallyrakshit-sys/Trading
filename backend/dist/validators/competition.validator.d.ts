import { z } from 'zod';
export declare const createCompetitionSchema: z.ZodObject<{
    body: z.ZodObject<{
        startTime: z.ZodString;
        endTime: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        startTime: string;
        endTime: string;
    }, {
        startTime: string;
        endTime: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        startTime: string;
        endTime: string;
    };
}, {
    body: {
        startTime: string;
        endTime: string;
    };
}>;
export declare const updateCompetitionSchema: z.ZodObject<{
    body: z.ZodObject<{
        status: z.ZodOptional<z.ZodEnum<["UPCOMING", "LIVE", "PAUSED", "ENDED"]>>;
        startTime: z.ZodOptional<z.ZodString>;
        endTime: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status?: "UPCOMING" | "LIVE" | "PAUSED" | "ENDED" | undefined;
        startTime?: string | undefined;
        endTime?: string | undefined;
    }, {
        status?: "UPCOMING" | "LIVE" | "PAUSED" | "ENDED" | undefined;
        startTime?: string | undefined;
        endTime?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        status?: "UPCOMING" | "LIVE" | "PAUSED" | "ENDED" | undefined;
        startTime?: string | undefined;
        endTime?: string | undefined;
    };
}, {
    body: {
        status?: "UPCOMING" | "LIVE" | "PAUSED" | "ENDED" | undefined;
        startTime?: string | undefined;
        endTime?: string | undefined;
    };
}>;
export type CreateCompetitionInput = z.infer<typeof createCompetitionSchema>['body'];
export type UpdateCompetitionInput = z.infer<typeof updateCompetitionSchema>['body'];
//# sourceMappingURL=competition.validator.d.ts.map