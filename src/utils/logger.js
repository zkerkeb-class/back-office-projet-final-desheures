/* eslint-disable no-console */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
const logLevels = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  DEBUG: 'DEBUG',
};

const logger = (level, message) => {
  const timestamp = new Date().toISOString();
  switch (level) {
    case logLevels.INFO:
      console.info(`[${timestamp}] [INFO]: ${message}`);
      break;
    case logLevels.WARN:
      console.warn(`[${timestamp}] [WARN]: ${message}`);
      break;
    case logLevels.ERROR:
      console.error(`[${timestamp}] [ERROR]: ${message}`);
      break;
    case logLevels.DEBUG:
      if (process.env.NODE_ENV === 'development') {
        console.debug(`[${timestamp}] [DEBUG]: ${message}`);
      }
      break;
    default:
      console.log(`[${timestamp}] [LOG]: ${message}`);
  }
};

export const logInfo = (message) => logger(logLevels.INFO, message);
export const logWarn = (message) => logger(logLevels.WARN, message);
export const logError = (message) => logger(logLevels.ERROR, message);
export const logDebug = (message) => logger(logLevels.DEBUG, message);
