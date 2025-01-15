/* eslint-disable no-console */
/* eslint-disable comma-dangle */
const LOG_LEVELS = {
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
  DEBUG: 'DEBUG',
};

const formatMessage = (level, message) => {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level}]: ${message}`;
};

export const logError = (error) => {
  console.error(formatMessage(LOG_LEVELS.ERROR, error.message || error));
  if (error.stack) {
    console.error(error.stack);
  }
};
