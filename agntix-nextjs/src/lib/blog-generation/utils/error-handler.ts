// ==============================================
// Blog Generation System - Error Handler
// ==============================================

import { APIError } from '../types';

export class BlogGenerationError extends Error {
  public code: string;
  public status?: number;
  public details?: any;
  public retryable: boolean;

  constructor(
    message: string,
    code: string,
    status?: number,
    details?: any,
    retryable: boolean = false
  ) {
    super(message);
    this.name = 'BlogGenerationError';
    this.code = code;
    this.status = status;
    this.details = details;
    this.retryable = retryable;

    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BlogGenerationError);
    }
  }
}

// Specific error types
export class APIConnectionError extends BlogGenerationError {
  constructor(service: string, originalError?: Error) {
    super(
      `Failed to connect to ${service}`,
      'API_CONNECTION_ERROR',
      undefined,
      { originalError: originalError?.message },
      true // Connection errors are retryable
    );
  }
}

export class RateLimitError extends BlogGenerationError {
  constructor(service: string, retryAfter?: number) {
    super(
      `Rate limit exceeded for ${service}`,
      'RATE_LIMIT_ERROR',
      429,
      { retryAfter },
      true // Rate limits are retryable after delay
    );
  }
}

export class InvalidResponseError extends BlogGenerationError {
  constructor(service: string, details?: any) {
    super(
      `Invalid response from ${service}`,
      'INVALID_RESPONSE_ERROR',
      undefined,
      details,
      false // Invalid responses usually aren't retryable
    );
  }
}

export class DatabaseError extends BlogGenerationError {
  constructor(operation: string, originalError?: Error) {
    super(
      `Database operation failed: ${operation}`,
      'DATABASE_ERROR',
      undefined,
      { originalError: originalError?.message },
      true // Database errors might be retryable
    );
  }
}

export class ValidationError extends BlogGenerationError {
  constructor(field: string, message: string) {
    super(
      `Validation error: ${field} - ${message}`,
      'VALIDATION_ERROR',
      400,
      { field },
      false // Validation errors are not retryable
    );
  }
}

// Error handler utility functions
export class ErrorHandler {
  static isRetryable(error: Error): boolean {
    if (error instanceof BlogGenerationError) {
      return error.retryable;
    }

    // Check for common retryable error patterns
    const retryablePatterns = [
      'ECONNRESET',
      'ETIMEDOUT',
      'ENOTFOUND',
      'ECONNREFUSED',
      'socket hang up',
      'network',
      'timeout',
    ];

    const errorMessage = error.message.toLowerCase();
    return retryablePatterns.some((pattern) =>
      errorMessage.includes(pattern.toLowerCase())
    );
  }

  static isRateLimitError(error: Error): boolean {
    if (error instanceof RateLimitError) {
      return true;
    }

    const message = error.message.toLowerCase();
    return (
      message.includes('rate limit') ||
      message.includes('too many requests') ||
      message.includes('429')
    );
  }

  static toAPIError(error: Error | any): APIError {
    if (error instanceof BlogGenerationError) {
      return {
        message: error.message,
        code: error.code,
        status: error.status,
        details: error.details,
      };
    }

    return {
      message: error.message || 'An unknown error occurred',
      code: error.code || 'UNKNOWN_ERROR',
      status: error.status || 500,
      details: error,
    };
  }

  static async handleAsyncError<T>(
    operation: () => Promise<T>,
    errorContext: string
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (error instanceof BlogGenerationError) {
        throw error;
      }

      throw new BlogGenerationError(
        `${errorContext}: ${(error as Error).message}`,
        'OPERATION_ERROR',
        undefined,
        error,
        ErrorHandler.isRetryable(error as Error)
      );
    }
  }

  static getRetryDelay(error: Error, attempt: number): number {
    // If rate limit error with retry-after header
    if (error instanceof RateLimitError && error.details?.retryAfter) {
      return error.details.retryAfter * 1000; // Convert to ms
    }

    // Exponential backoff: 1s, 2s, 4s, 8s
    return Math.min(1000 * Math.pow(2, attempt), 10000);
  }
}

// Axios/Fetch error parser
export function parseHTTPError(error: any): BlogGenerationError {
  // Axios error
  if (error.response) {
    const status = error.response.status;
    const data = error.response.data;

    if (status === 429) {
      const retryAfter = error.response.headers?.['retry-after'];
      return new RateLimitError(
        'API',
        retryAfter ? parseInt(retryAfter) : undefined
      );
    }

    if (status === 401 || status === 403) {
      return new BlogGenerationError(
        'Authentication failed',
        'AUTH_ERROR',
        status,
        data,
        false
      );
    }

    if (status >= 500) {
      return new BlogGenerationError(
        data?.message || 'Server error',
        'SERVER_ERROR',
        status,
        data,
        true // Server errors are retryable
      );
    }

    return new BlogGenerationError(
      data?.message || error.message,
      'API_ERROR',
      status,
      data,
      false
    );
  }

  // Network error
  if (error.request) {
    return new APIConnectionError('API', error);
  }

  // Other errors
  return new BlogGenerationError(
    error.message || 'Unknown error',
    'UNKNOWN_ERROR',
    undefined,
    error,
    false
  );
}

// OpenAI specific error parser
export function parseOpenAIError(error: any): BlogGenerationError {
  if (error.status === 429) {
    // Extract retry-after header if available
    const retryAfter = error?.headers?.['retry-after'];
    return new RateLimitError(
      'OpenAI API',
      retryAfter ? parseInt(retryAfter) : undefined
    );
  }

  if (error.status === 401) {
    return new BlogGenerationError(
      'Invalid OpenAI API key',
      'OPENAI_AUTH_ERROR',
      401,
      undefined,
      false
    );
  }

  if (error.status === 400) {
    return new ValidationError(
      'OpenAI request',
      error.message || 'Invalid request parameters'
    );
  }

  return new BlogGenerationError(
    error.message || 'OpenAI API error',
    'OPENAI_ERROR',
    error.status,
    error,
    error.status >= 500
  );
}

export default ErrorHandler;
