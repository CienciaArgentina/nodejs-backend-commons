import winston, { createLogger, Logger, format } from 'winston';
import dotenv from 'dotenv';
dotenv.config();

export const transports = {
  console: new winston.transports.Console(),
};

const readinessPath = process.env.READINESS || '/health';
const livenessPath = process.env.LIVENESS || '/ping';
const serviceName = process.env.SERVICE_NAME || '';
const levelLogger = process.env.LOGGER_APP_LEVEL || 'info';

export const logger: Logger = createLogger({
  level: levelLogger,
  defaultMeta: { service: process.env.SERVICE_NAME },
  format: format.combine(format.errors({ stack: true }), format.timestamp(), format.json()),
  transports: [transports.console],
});

winston.exceptions.handle(transports.console);

//Config log request and response
const formatMessage = 'HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}';
export const configLoggerRequestResponse = {
  ignoredRoutes: [livenessPath, readinessPath],
  transports: [transports.console],
  format: format.combine(format.timestamp(), format.metadata(), format.json()),
  meta: true,
  baseMeta: { service: serviceName },
  msg: formatMessage,
};
