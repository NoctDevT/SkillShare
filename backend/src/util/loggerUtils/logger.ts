import winston from 'winston';

export const logger = winston.createLogger({
  level: 'http', 
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ level, message, timestamp, stack, ...meta }) => {
      const metaInfo = Object.keys(meta).length
        ? `\n meta: ${JSON.stringify(meta, null, 2)}`
        : '';
      return `[${timestamp}] ${level.toUpperCase()}: ${stack || message}${metaInfo}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/http.log', level: 'http' }),
    new winston.transports.File({ filename: 'logs/warn.log', level: 'warn' }),
    new winston.transports.File({ filename: 'logs/errors.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

