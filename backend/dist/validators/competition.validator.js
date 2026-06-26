"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCompetitionSchema = exports.createCompetitionSchema = void 0;
const zod_1 = require("zod");
exports.createCompetitionSchema = zod_1.z.object({
    body: zod_1.z.object({
        startTime: zod_1.z.string().datetime({ message: 'Invalid datetime format' }),
        endTime: zod_1.z.string().datetime({ message: 'Invalid datetime format' }),
    }),
});
exports.updateCompetitionSchema = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum(['UPCOMING', 'LIVE', 'PAUSED', 'ENDED']).optional(),
        startTime: zod_1.z.string().datetime().optional(),
        endTime: zod_1.z.string().datetime().optional(),
    }),
});
//# sourceMappingURL=competition.validator.js.map