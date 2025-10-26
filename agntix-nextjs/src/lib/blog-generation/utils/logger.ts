// ==============================================
// Blog Generation System - Logger Utility
// ==============================================

type LogLevel = 'info' | 'warn' | 'error' | 'debug' | 'success';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  workflowId?: string;
  step?: string;
  message: string;
  data?: any;
}

class Logger {
  private workflowId?: string;
  private debugMode: boolean;

  constructor(workflowId?: string) {
    this.workflowId = workflowId;
    this.debugMode = process.env.DEBUG_MODE === 'true';
  }

  private formatLog(level: LogLevel, message: string, data?: any): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      workflowId: this.workflowId,
      message,
      data,
    };
  }

  private output(logEntry: LogEntry): void {
    const prefix = this.workflowId
      ? `[Workflow: ${this.workflowId.substring(0, 8)}]`
      : '[BlogGen]';

    const levelColors: Record<LogLevel, string> = {
      info: '\x1b[36m', // Cyan
      warn: '\x1b[33m', // Yellow
      error: '\x1b[31m', // Red
      debug: '\x1b[35m', // Magenta
      success: '\x1b[32m', // Green
    };

    const reset = '\x1b[0m';
    const color = levelColors[logEntry.level] || '';

    const logMessage = `${color}${prefix} [${logEntry.level.toUpperCase()}] ${logEntry.message}${reset}`;

    switch (logEntry.level) {
      case 'error':
        console.error(logMessage, logEntry.data || '');
        break;
      case 'warn':
        console.warn(logMessage, logEntry.data || '');
        break;
      case 'debug':
        if (this.debugMode) {
          console.debug(logMessage, logEntry.data || '');
        }
        break;
      default:
        console.log(logMessage, logEntry.data || '');
    }
  }

  info(message: string, data?: any): void {
    this.output(this.formatLog('info', message, data));
  }

  warn(message: string, data?: any): void {
    this.output(this.formatLog('warn', message, data));
  }

  error(message: string, error?: Error | any): void {
    const errorData = error
      ? {
          message: error.message,
          stack: error.stack,
          ...error,
        }
      : undefined;

    this.output(this.formatLog('error', message, errorData));
  }

  debug(message: string, data?: any): void {
    this.output(this.formatLog('debug', message, data));
  }

  success(message: string, data?: any): void {
    this.output(this.formatLog('success', message, data));
  }

  step(stepName: string, message: string): void {
    this.info(`[${stepName}] ${message}`);
  }

  stepStart(stepName: string): void {
    this.info(`[${stepName}] Started`);
  }

  stepComplete(stepName: string, duration?: number): void {
    const durationMsg = duration ? ` (${duration}ms)` : '';
    this.success(`[${stepName}] Completed${durationMsg}`);
  }

  stepError(stepName: string, error: Error): void {
    this.error(`[${stepName}] Failed`, error);
  }

  setWorkflowId(workflowId: string): void {
    this.workflowId = workflowId;
  }
}

// Export a factory function to create logger instances
export function createLogger(workflowId?: string): Logger {
  return new Logger(workflowId);
}

// Export default logger instance for non-workflow logging
export const logger = new Logger();

export default logger;
