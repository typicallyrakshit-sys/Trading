import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import { env } from '../config/env';

const LOG_DIR = path.resolve(process.cwd(), env.LOG_DIR);

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

const consoleFormat = printf(({ level, message, timestamp: ts, stack }) => {
  return `${ts} [${level}]: ${stack ?? message}`;
});

const fileTransportOptions = {
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
};

export const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  format: combine(
    errors({ stack: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    json(),
  ),
  transports: [
    // Console transport
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }),
        timestamp({ format: 'HH:mm:ss' }),
        errors({ stack: true }),
        consoleFormat,
      ),
    }),
    // Daily rotate — info logs
    new DailyRotateFile({
      ...fileTransportOptions,
      filename: path.join(LOG_DIR, 'application-%DATE%.log'),
      level: 'info',
    }),
    // Daily rotate — error logs
    new DailyRotateFile({
      ...fileTransportOptions,
      filename: path.join(LOG_DIR, 'error-%DATE%.log'),
      level: 'error',
    }),
  ],
  exceptionHandlers: [
    new DailyRotateFile({
      ...fileTransportOptions,
      filename: path.join(LOG_DIR, 'exceptions-%DATE%.log'),
    }),
  ],
  rejectionHandlers: [
    new DailyRotateFile({
      ...fileTransportOptions,
      filename: path.join(LOG_DIR, 'rejections-%DATE%.log'),
    }),
  ],
});
