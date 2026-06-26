"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const ApiError_1 = require("../utils/ApiError");
const asyncHandler_1 = require("../utils/asyncHandler");
/**
 * Authentication middleware placeholder.
 * Phase 3 will integrate Firebase Admin SDK here.
 * For now it validates the presence of a Bearer token header.
 */
exports.authenticate = (0, asyncHandler_1.asyncHandler)(async (req, _res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw ApiError_1.ApiError.unauthorized('Missing or malformed Authorization header');
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
        throw ApiError_1.ApiError.unauthorized('Token not provided');
    }
    // Phase 3: Verify Firebase ID token via Firebase Admin SDK
    // const decodedToken = await admin.auth().verifyIdToken(token);
    // Attach user to request
    req.user = {
        id: 'placeholder-user-id',
        email: 'placeholder@nydc.in',
        role: 'PARTICIPANT',
        firebaseUid: token,
    };
    next();
});
//# sourceMappingURL=auth.middleware.js.map