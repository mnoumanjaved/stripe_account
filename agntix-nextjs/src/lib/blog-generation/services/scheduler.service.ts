// ==============================================
// Blog Generation System - Scheduler Service
// ==============================================
// Note: This is for local development only
// In production, use Vercel Cron (vercel.json)
// ==============================================

import cron from 'node-cron';
import { BlogGenerationWorkflow } from '../workflows/blog-generation.workflow';
import { logger } from '../utils/logger';

class SchedulerService {
  private task: cron.ScheduledTask | null = null;
  private isRunning: boolean = false;

  /**
   * Start the scheduler
   */
  start(schedule?: string): void {
    const cronSchedule =
      schedule ||
      process.env.BLOG_SCHEDULE_INTERVAL ||
      '0 */12 * * *'; // Every 12 hours by default

    if (this.isRunning) {
      logger.warn('Scheduler is already running');
      return;
    }

    // Validate cron expression
    if (!cron.validate(cronSchedule)) {
      throw new Error(`Invalid cron schedule: ${cronSchedule}`);
    }

    logger.info(`Starting scheduler with schedule: ${cronSchedule}`);

    this.task = cron.schedule(cronSchedule, async () => {
      logger.info('⏰ Scheduled blog generation triggered');

      try {
        const workflow = new BlogGenerationWorkflow();
        const result = await workflow.execute();

        if (result.success) {
          logger.success('Scheduled blog generation completed', {
            workflowId: result.workflowId,
            blogId: result.blogData?.id,
            slug: result.blogData?.slug,
          });
        } else {
          logger.error('Scheduled blog generation failed', {
            workflowId: result.workflowId,
            error: result.error,
          });
        }
      } catch (error) {
        logger.error('Error in scheduled blog generation', error);
      }
    });

    this.isRunning = true;
    logger.success('Scheduler started successfully');
  }

  /**
   * Stop the scheduler
   */
  stop(): void {
    if (!this.isRunning || !this.task) {
      logger.warn('Scheduler is not running');
      return;
    }

    this.task.stop();
    this.task = null;
    this.isRunning = false;

    logger.success('Scheduler stopped');
  }

  /**
   * Check if scheduler is running
   */
  isSchedulerRunning(): boolean {
    return this.isRunning;
  }

  /**
   * Trigger a manual execution (for testing)
   */
  async triggerManual(): Promise<void> {
    logger.info('Manual trigger initiated');

    const workflow = new BlogGenerationWorkflow();
    const result = await workflow.execute();

    if (result.success) {
      logger.success('Manual blog generation completed', {
        workflowId: result.workflowId,
        blogId: result.blogData?.id,
      });
    } else {
      logger.error('Manual blog generation failed', {
        workflowId: result.workflowId,
        error: result.error,
      });
    }
  }
}

// Export singleton instance
export const schedulerService = new SchedulerService();
export default schedulerService;

// Auto-start scheduler in development if enabled
if (process.env.NODE_ENV === 'development' && process.env.AUTO_START_SCHEDULER === 'true') {
  schedulerService.start();
  logger.info('Scheduler auto-started in development mode');
}
