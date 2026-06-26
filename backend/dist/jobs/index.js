"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startJobs = startJobs;
exports.stopJobs = stopJobs;
const logger_1 = require("../utils/logger");
const jobs = [
    {
        name: 'leaderboard-refresh',
        intervalMs: 30_000,
        handler: async () => {
            // Phase 3: leaderboardService.refreshLeaderboard()
            logger_1.logger.info('[Job] leaderboard-refresh — placeholder run');
        },
    },
    {
        name: 'portfolio-sync',
        intervalMs: 10_000,
        handler: async () => {
            // Phase 3: sync portfolio values with latest market prices
            logger_1.logger.info('[Job] portfolio-sync — placeholder run');
        },
    },
];
function startJobs() {
    jobs.forEach((job) => {
        job.timerId = setInterval(async () => {
            try {
                await job.handler();
            }
            catch (err) {
                logger_1.logger.error(`[Job] ${job.name} failed:`, err);
            }
        }, job.intervalMs);
        logger_1.logger.info(`[Job] Scheduled: ${job.name} every ${job.intervalMs / 1000}s`);
    });
}
function stopJobs() {
    jobs.forEach((job) => {
        if (job.timerId) {
            clearInterval(job.timerId);
            logger_1.logger.info(`[Job] Stopped: ${job.name}`);
        }
    });
}
//# sourceMappingURL=index.js.map