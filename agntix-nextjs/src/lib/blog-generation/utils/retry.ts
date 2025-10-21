// ==============================================
// Blog Generation System - Retry Utility
// ==============================================

import { RetryOptions } from '../types';
import { ErrorHandler } from './error-handler';
import { logger } from './logger';

const DEFAULT_RETRY_OPTIONS: RetryOptions = {
  maxAttempts: 3,
  delayMs: 1000,
  backoff: 'exponential',
};

/**
 * Retry an async operation with exponential or linear backoff
 */
export async function retryOperation<T>(
  operation: () => Promise<T>,
  operationName: string,
  options: Partial<RetryOptions> = {}
): Promise<T> {
  const config = { ...DEFAULT_RETRY_OPTIONS, ...options };
  let lastError: Error;

  for (let attempt = 0; attempt < config.maxAttempts; attempt++) {
    try {
      if (attempt > 0) {
        logger.info(
          `Retrying ${operationName} (attempt ${attempt + 1}/${config.maxAttempts})`
        );
      }

      const result = await operation();

      if (attempt > 0) {
        logger.success(
          `${operationName} succeeded on attempt ${attempt + 1}`
        );
      }

      return result;
    } catch (error) {
      lastError = error as Error;

      // Check if error is retryable
      const isRetryable = ErrorHandler.isRetryable(lastError);
      const isLastAttempt = attempt === config.maxAttempts - 1;

      if (!isRetryable || isLastAttempt) {
        logger.error(
          `${operationName} failed ${isRetryable ? 'after max retries' : '(not retryable)'}`,
          lastError
        );
        throw lastError;
      }

      // Calculate delay
      const delay = calculateDelay(attempt, config, lastError);

      logger.warn(
        `${operationName} failed (attempt ${attempt + 1}/${config.maxAttempts}), retrying in ${delay}ms`,
        { error: lastError.message }
      );

      // Call onRetry callback if provided
      if (config.onRetry) {
        config.onRetry(attempt + 1, lastError);
      }

      // Wait before retrying
      await sleep(delay);
    }
  }

  throw lastError!;
}

/**
 * Calculate delay based on backoff strategy
 */
function calculateDelay(
  attempt: number,
  config: RetryOptions,
  error: Error
): number {
  // Use error-specific delay if available (e.g., rate limit retry-after)
  const errorDelay = ErrorHandler.getRetryDelay(error, attempt);
  if (errorDelay > config.delayMs) {
    return errorDelay;
  }

  // Check if this is a rate limit error - use much longer delays
  const isRateLimitError = ErrorHandler.isRateLimitError(error);

  if (config.backoff === 'exponential') {
    // For rate limits: use base 3 exponential backoff (3s, 9s, 27s)
    // For other errors: use base 2 exponential backoff (2s, 4s, 8s)
    const base = isRateLimitError ? 3 : 2;
    const maxDelay = 30000; // 30 seconds max
    return Math.min(config.delayMs * Math.pow(base, attempt), maxDelay);
  } else {
    // Linear backoff: delay * attempt
    return config.delayMs * (attempt + 1);
  }
}

/**
 * Sleep utility
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry with jitter to avoid thundering herd
 */
export async function retryWithJitter<T>(
  operation: () => Promise<T>,
  operationName: string,
  options: Partial<RetryOptions> = {}
): Promise<T> {
  return retryOperation(
    operation,
    operationName,
    {
      ...options,
      delayMs: addJitter(options.delayMs || DEFAULT_RETRY_OPTIONS.delayMs),
    }
  );
}

/**
 * Add random jitter to delay (±25%)
 */
function addJitter(delay: number): number {
  const jitter = delay * 0.25; // 25% jitter
  return delay + (Math.random() * jitter * 2 - jitter);
}

/**
 * Batch retry - retry multiple operations independently
 */
export async function retryBatch<T>(
  operations: Array<{ fn: () => Promise<T>; name: string }>,
  options: Partial<RetryOptions> = {}
): Promise<T[]> {
  const results = await Promise.allSettled(
    operations.map((op) => retryOperation(op.fn, op.name, options))
  );

  const errors: Error[] = [];
  const values: T[] = [];

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      values.push(result.value);
    } else {
      errors.push(
        new Error(
          `${operations[index].name} failed: ${result.reason.message}`
        )
      );
    }
  });

  if (errors.length > 0) {
    throw new Error(
      `Batch operation failed: ${errors.map((e) => e.message).join('; ')}`
    );
  }

  return values;
}

/**
 * Circuit breaker pattern for repeated failures
 */
export class CircuitBreaker {
  private failureCount: number = 0;
  private lastFailureTime: number = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';

  constructor(
    private threshold: number = 5,
    private timeout: number = 60000 // 60 seconds
  ) {}

  async execute<T>(
    operation: () => Promise<T>,
    operationName: string
  ): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailureTime > this.timeout) {
        this.state = 'half-open';
        logger.info(
          `Circuit breaker half-open for ${operationName}, attempting operation`
        );
      } else {
        throw new Error(
          `Circuit breaker open for ${operationName}, rejecting request`
        );
      }
    }

    try {
      const result = await operation();

      if (this.state === 'half-open') {
        this.reset();
        logger.success(
          `Circuit breaker closed for ${operationName} after successful recovery`
        );
      }

      return result;
    } catch (error) {
      this.recordFailure();
      logger.error(
        `Circuit breaker recorded failure for ${operationName} (${this.failureCount}/${this.threshold})`,
        error
      );
      throw error;
    }
  }

  private recordFailure(): void {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.failureCount >= this.threshold) {
      this.state = 'open';
      logger.warn(
        `Circuit breaker opened after ${this.failureCount} failures`
      );
    }
  }

  private reset(): void {
    this.failureCount = 0;
    this.state = 'closed';
  }

  getState(): { state: string; failures: number } {
    return {
      state: this.state,
      failures: this.failureCount,
    };
  }
}

export default {
  retryOperation,
  retryWithJitter,
  retryBatch,
  CircuitBreaker,
};
