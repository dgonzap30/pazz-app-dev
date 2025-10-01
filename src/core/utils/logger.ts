import { toast } from 'sonner';
// Note: Log aggregation is handled in the web app layer

enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4,
}

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context?: Record<string, any> | undefined;
  error?: Error | undefined;
  userId?: string | undefined;
  sessionId?: string | undefined;
}

interface LoggerConfig {
  level: LogLevel;
  enableConsole: boolean;
  enableRemote: boolean;
  remoteEndpoint?: string | undefined;
  showToasts: boolean;
  toastOnlyErrors: boolean;
}

class Logger {
  private config: LoggerConfig;
  private logs: LogEntry[] = [];
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.config = this.getDefaultConfig();
  }

  private getDefaultConfig(): LoggerConfig {
    // Guard against undefined import.meta.env
    const mode = typeof import.meta !== 'undefined' && import.meta.env?.MODE || 'production';
    const isDevelopment = mode === 'development';
    const isTest = mode === 'test';
    const logEndpoint = typeof import.meta !== 'undefined' && import.meta.env?.['VITE_LOG_ENDPOINT'] || undefined;

    return {
      level: isDevelopment ? LogLevel.DEBUG : LogLevel.INFO,
      enableConsole: isDevelopment && !isTest,
      enableRemote: !isDevelopment && !isTest,
      remoteEndpoint: logEndpoint,
      showToasts: true,
      toastOnlyErrors: true,
    };
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  }

  public configure(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config };
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.config.level;
  }

  private formatMessage(entry: LogEntry): string {
    const levelName = LogLevel[entry.level];
    const timestamp = entry.timestamp.toISOString();
    let message = `[${timestamp}] [${levelName}] ${entry.message}`;

    if (entry.context) {
      message += ` | Context: ${JSON.stringify(entry.context)}`;
    }

    if (entry.error) {
      message += ` | Error: ${entry.error.message}`;
      if (entry.error.stack) {
        message += `\nStack: ${entry.error.stack}`;
      }
    }

    return message;
  }

  private async sendToRemote(entry: LogEntry): Promise<void> {
    if (!this.config.enableRemote || !this.config.remoteEndpoint) {
      return;
    }

    try {
      await fetch(this.config.remoteEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...entry,
          sessionId: this.sessionId,
          userAgent: navigator.userAgent,
          url: window.location.href,
        }),
      });
    } catch (error) {
      // Silently fail to avoid infinite loop
      if (this.config.enableConsole) {
        console.error('Failed to send log to remote:', error);
      }
    }
  }

  private log(level: LogLevel, message: string, context?: Record<string, any>, error?: Error): void {
    if (!this.shouldLog(level)) {
      return;
    }

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      context: context || undefined,
      error: error || undefined,
      userId: this.getCurrentUserId() || undefined,
      sessionId: this.sessionId,
    };

    // Store in memory (with limit)
    this.logs.push(entry);
    if (this.logs.length > 1000) {
      this.logs = this.logs.slice(-500); // Keep last 500 logs
    }

    // Console output
    if (this.config.enableConsole) {
      const formattedMessage = this.formatMessage(entry);
      switch (level) {
        case LogLevel.DEBUG:
          console.debug(formattedMessage);
          break;
        case LogLevel.INFO:
          console.info(formattedMessage);
          break;
        case LogLevel.WARN:
          console.warn(formattedMessage);
          break;
        case LogLevel.ERROR:
        case LogLevel.FATAL:
          console.error(formattedMessage);
          break;
      }
    }

    // Show toast notifications
    if (this.config.showToasts) {
      if (level === LogLevel.ERROR || level === LogLevel.FATAL) {
        toast.error(message);
      } else if (!this.config.toastOnlyErrors) {
        switch (level) {
          case LogLevel.INFO:
            toast.info(message);
            break;
          case LogLevel.WARN:
            toast.warning(message);
            break;
        }
      }
    }

    // Send to remote
    this.sendToRemote(entry);
  }

  private getCurrentUserId(): string | undefined {
    // This should be implemented based on your auth system
    // For now, try to get from localStorage or session
    try {
      const authData = localStorage.getItem('sb-auth-token');
      if (authData) {
        const parsed = JSON.parse(authData);
        return parsed.user?.id;
      }
    } catch {
      // Ignore errors
    }
    return undefined;
  }

  // Public logging methods
  public debug(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  public info(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.INFO, message, context);
  }

  public warn(message: string, context?: Record<string, any>): void {
    this.log(LogLevel.WARN, message, context);
  }

  public error(message: string, error?: Error | unknown, context?: Record<string, any>): void {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    this.log(LogLevel.ERROR, message, context, errorObj);
  }

  public fatal(message: string, error?: Error | unknown, context?: Record<string, any>): void {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    this.log(LogLevel.FATAL, message, context, errorObj);
  }

  // Utility methods
  public getLogs(level?: LogLevel): LogEntry[] {
    if (level !== undefined) {
      return this.logs.filter(log => log.level === level);
    }
    return [...this.logs];
  }

  public clearLogs(): void {
    this.logs = [];
  }

  public downloadLogs(): void {
    const logsText = this.logs.map(entry => this.formatMessage(entry)).join('\n');
    const blob = new Blob([logsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pazz-logs-${new Date().toISOString()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // Performance logging
  public time(label: string): void {
    if (this.config.enableConsole && this.shouldLog(LogLevel.DEBUG)) {
      console.time(label);
    }
  }

  public timeEnd(label: string): void {
    if (this.config.enableConsole && this.shouldLog(LogLevel.DEBUG)) {
      console.timeEnd(label);
    }
  }

  // Group logging
  public group(label: string): void {
    if (this.config.enableConsole && this.shouldLog(LogLevel.DEBUG)) {
      console.group(label);
    }
  }

  public groupEnd(): void {
    if (this.config.enableConsole && this.shouldLog(LogLevel.DEBUG)) {
      console.groupEnd();
    }
  }

  // Table logging
  public table(data: unknown[], columns?: string[]): void {
    if (this.config.enableConsole && this.shouldLog(LogLevel.DEBUG)) {
      console.table(data, columns);
    }
  }
}

// Create singleton instance
const logger = new Logger();

// Export singleton instance and types
export { logger };

// React hook for using logger with component context
export function useLogger(componentName: string) {
  return {
    debug: (message: string, context?: Record<string, any>) => 
      logger.debug(message, { component: componentName, ...context }),
    info: (message: string, context?: Record<string, any>) => 
      logger.info(message, { component: componentName, ...context }),
    warn: (message: string, context?: Record<string, any>) => 
      logger.warn(message, { component: componentName, ...context }),
    error: (message: string, error?: Error | unknown, context?: Record<string, any>) => 
      logger.error(message, error, { component: componentName, ...context }),
  };
}