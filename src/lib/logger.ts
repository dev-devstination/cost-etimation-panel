type LogLevel = "debug" | "info" | "warn" | "error"

interface LogContext {
  [key: string]: string | number | boolean | null | undefined
  duration?: number
  memoryUsage?: number
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
}

const LOG_COLORS: Record<LogLevel, string> = {
  debug: "\x1b[36m", // Cyan
  info: "\x1b[32m", // Green
  warn: "\x1b[33m", // Yellow
  error: "\x1b[31m", // Red
}

const RESET_COLOR = "\x1b[0m"

interface LoggerConfig {
  minLevel: LogLevel
  enableColors: boolean
}

class Logger {
  private config: LoggerConfig

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = {
      minLevel:
        (process.env.LOG_LEVEL as LogLevel) ||
        (process.env.NODE_ENV === "production" ? "info" : "debug"),

      enableColors:
        config.enableColors ?? process.env.NODE_ENV !== "production",
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVELS[level] >= LOG_LEVELS[this.config.minLevel]
  }

  private redactSensitiveInfo(
    obj: Record<string, unknown>
  ): Record<string, unknown> {
    const fieldsToRedact = process.env.REDACT_FIELDS?.split(",") || []
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        fieldsToRedact.includes(key) ? "[REDACTED]" : value,
      ])
    )
  }

  private formatMessage(
    level: LogLevel,
    message: string,
    context?: LogContext
  ): string | Record<string, unknown> {
    const timestamp = new Date().toISOString()
    const redactedContext = this.redactSensitiveInfo(context || {})

    if (process.env.LOG_FORMAT === "json") {
      return {
        timestamp,
        level,
        message,
        ...redactedContext,
      }
    }
    const contextString = Object.keys(redactedContext).length
      ? ` ${JSON.stringify(redactedContext)}`
      : ""
    const color = this.config.enableColors ? LOG_COLORS[level] : ""
    return `${color}[${timestamp}] [${level.toUpperCase()}] ${message}${contextString}${RESET_COLOR}`
  }

  private log(level: LogLevel, message: string, context?: LogContext): void {
    if (this.shouldLog(level)) {
      const formattedMessage = this.formatMessage(level, message, context)
      if (typeof formattedMessage === "string") {
        console[level](formattedMessage)
      } else {
        console[level](JSON.stringify(formattedMessage))
      }

      if (level === "error" && process.env.NODE_ENV === "production") {
        // Uncomment when Sentry is set up
        // void import('@sentry/nextjs').then(Sentry => {
        //   Sentry.captureException(new Error(message), { extra: context });
        // });
      }
    }
  }

  debug(message: string, context?: LogContext): void {
    this.log("debug", message, context)
  }

  info(message: string, context?: LogContext): void {
    this.log("info", message, context)
  }

  warn(message: string, context?: LogContext): void {
    this.log("warn", message, context)
  }

  error(message: string, context?: LogContext): void {
    this.log("error", message, context)
  }

  logPerformance(message: string, duration: number): void {
    this.info(message, { duration })
  }
}

const createLogger = (config?: Partial<LoggerConfig>): Logger =>
  new Logger(config)

const defaultLogger = createLogger()

export { createLogger, Logger, defaultLogger as default }
export type { LoggerConfig, LogContext }
