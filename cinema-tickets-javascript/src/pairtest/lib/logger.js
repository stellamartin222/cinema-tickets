import winston from 'winston';
import 'winston-daily-rotate-file';
const { combine, timestamp, json } = winston.format;

const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: './logs/log-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
});

export const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  transports: [fileRotateTransport],
});
