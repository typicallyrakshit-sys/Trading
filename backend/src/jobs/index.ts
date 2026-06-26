import { logger } from '../utils/logger';

/**
 * Background job scheduler placeholder.
 * Phase 3: Will use node-cron or BullMQ for:
 * - Leaderboard recalculation every 30 seconds
 * - Portfolio value update on every market tick
 * - Competition start/end automation
 * - Stale order cleanup
 */

interface Job {
  name: string;
  intervalMs: number;
  handler: () => Promise<void>;
  timerId?: ReturnType<typeof setInterval>;
}

const jobs: Job[] = [
  {
    name: 'leaderboard-refresh',
    intervalMs: 30_000,
    handler: async () => {
      // Phase 3: leaderboardService.refreshLeaderboard()
      logger.info('[Job] leaderboard-refresh — placeholder run');
    },
  },
  {
    name: 'portfolio-sync',
    intervalMs: 10_000,
    handler: async () => {
      // Phase 3: sync portfolio values with latest market prices
      logger.info('[Job] portfolio-sync — placeholder run');
    },
  },
];

export function startJobs(): void {
  jobs.forEach((job) => {
    job.timerId = setInterval(async () => {
      try {
        await job.handler();
      } catch (err) {
        logger.error(`[Job] ${job.name} failed:`, err);
      }
    }, job.intervalMs);
    logger.info(`[Job] Scheduled: ${job.name} every ${job.intervalMs / 1000}s`);
  });
}

export function stopJobs(): void {
  jobs.forEach((job) => {
    if (job.timerId) {
      clearInterval(job.timerId);
      logger.info(`[Job] Stopped: ${job.name}`);
    }
  });
}
