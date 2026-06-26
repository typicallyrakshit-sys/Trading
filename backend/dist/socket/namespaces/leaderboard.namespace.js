"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerLeaderboardNamespace = registerLeaderboardNamespace;
const logger_1 = require("../../utils/logger");
const constants_1 = require("../../constants");
/**
 * /leaderboard namespace
 * Phase 3: Will broadcast live leaderboard rankings every N seconds.
 */
function registerLeaderboardNamespace(nsp) {
    nsp.on('connection', (socket) => {
        logger_1.logger.info(`[/leaderboard] Client connected: ${socket.id}`);
        // Placeholder: emit a sample leaderboard snapshot
        socket.emit(constants_1.SOCKET_EVENTS.LEADERBOARD_UPDATE, [
            { rank: 1, name: 'Alice', portfolioValue: 1150000, pnlPercentage: 15.0 },
            { rank: 2, name: 'Bob', portfolioValue: 1093000, pnlPercentage: 9.3 },
            { rank: 3, name: 'Charlie', portfolioValue: 1080000, pnlPercentage: 8.0 },
        ]);
        socket.on('disconnect', () => {
            logger_1.logger.info(`[/leaderboard] Client disconnected: ${socket.id}`);
        });
    });
}
//# sourceMappingURL=leaderboard.namespace.js.map