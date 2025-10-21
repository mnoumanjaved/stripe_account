// ==============================================
// Blog Generation System - Rate Limiter
// ==============================================

/**
 * Rate limiter to prevent overwhelming the OpenAI API
 * Ensures minimum interval between consecutive API calls
 */
class RateLimiter {
  private queue: Array<() => void> = [];
  private processing = false;
  private lastCallTime = 0;
  private minInterval = 2000; // 2 seconds between calls

  /**
   * Throttle an async operation
   * Queues the operation and ensures minimum interval between calls
   */
  async throttle<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await fn();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

      this.processQueue();
    });
  }

  /**
   * Process the queue with rate limiting
   */
  private async processQueue() {
    if (this.processing || this.queue.length === 0) return;

    this.processing = true;

    while (this.queue.length > 0) {
      const now = Date.now();
      const timeSinceLastCall = now - this.lastCallTime;

      // Wait if not enough time has passed since last call
      if (timeSinceLastCall < this.minInterval) {
        await new Promise((resolve) =>
          setTimeout(resolve, this.minInterval - timeSinceLastCall)
        );
      }

      const fn = this.queue.shift();
      if (fn) {
        this.lastCallTime = Date.now();
        await fn();
      }
    }

    this.processing = false;
  }

  /**
   * Get current queue status
   */
  getStatus(): { queueLength: number; processing: boolean } {
    return {
      queueLength: this.queue.length,
      processing: this.processing,
    };
  }

  /**
   * Update minimum interval between calls
   */
  setMinInterval(ms: number): void {
    this.minInterval = ms;
  }
}

// Export singleton instance for OpenAI API calls
export const openAIRateLimiter = new RateLimiter();

export default RateLimiter;
