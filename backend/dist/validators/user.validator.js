"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email('Invalid email address'),
        name: zod_1.z
            .string()
            .min(2, 'Name must be at least 2 characters')
            .max(100, 'Name too long'),
        firebaseUid: zod_1.z.string().optional(),
        avatar: zod_1.z.string().url('Invalid avatar URL').optional(),
    }),
});
exports.updateUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).max(100).optional(),
        avatar: zod_1.z.string().url().optional(),
    }),
});
//# sourceMappingURL=user.validator.js.map