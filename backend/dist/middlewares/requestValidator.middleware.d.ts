import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
/**
 * Middleware factory that validates request body, query, and params against a Zod schema.
 */
export declare const validate: (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=requestValidator.middleware.d.ts.map