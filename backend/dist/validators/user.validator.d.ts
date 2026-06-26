import { z } from 'zod';
export declare const createUserSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        name: z.ZodString;
        firebaseUid: z.ZodOptional<z.ZodString>;
        avatar: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        email: string;
        name: string;
        firebaseUid?: string | undefined;
        avatar?: string | undefined;
    }, {
        email: string;
        name: string;
        firebaseUid?: string | undefined;
        avatar?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        email: string;
        name: string;
        firebaseUid?: string | undefined;
        avatar?: string | undefined;
    };
}, {
    body: {
        email: string;
        name: string;
        firebaseUid?: string | undefined;
        avatar?: string | undefined;
    };
}>;
export declare const updateUserSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        avatar: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        avatar?: string | undefined;
    }, {
        name?: string | undefined;
        avatar?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name?: string | undefined;
        avatar?: string | undefined;
    };
}, {
    body: {
        name?: string | undefined;
        avatar?: string | undefined;
    };
}>;
export type CreateUserInput = z.infer<typeof createUserSchema>['body'];
export type UpdateUserInput = z.infer<typeof updateUserSchema>['body'];
//# sourceMappingURL=user.validator.d.ts.map