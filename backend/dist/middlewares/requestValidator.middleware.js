"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const ApiResponse_1 = require("../utils/ApiResponse");
/**
 * Middleware factory that validates request body, query, and params against a Zod schema.
 */
const validate = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const messages = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`);
            ApiResponse_1.ApiResponse.error(res, 400, 'Validation failed', messages);
            return;
        }
        next(error);
    }
};
exports.validate = validate;
//# sourceMappingURL=requestValidator.middleware.js.map