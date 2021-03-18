import log from 'loglevel';

export type Logger = Pick<
  log.Logger,
  'trace' | 'debug' | 'info' | 'warn' | 'error'
>;

log.setDefaultLevel(log.levels.TRACE);

if (process.env.NODE_ENV === 'production') {
  log.setDefaultLevel(log.levels.WARN);
}

const logger: Logger = {
  trace: log.trace,
  debug: log.debug,
  info: log.info,
  warn: log.warn,
  error: log.error,
};

export default logger;
