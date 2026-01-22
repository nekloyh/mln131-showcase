/**
 * Logger Utility
 * Provides environment-aware logging for the application
 */

const isDev = import.meta.env.VITE_NODE_ENV === 'development' || import.meta.env.DEV;
const isDebug = import.meta.env.VITE_DEBUG === 'true';

/**
 * Logger object with different log levels
 * Only logs in development or when debug mode is enabled
 */
export const logger = {
  /**
   * Debug level - only in development
   */
  debug: (...args) => {
    if (isDev || isDebug) {
      console.log('[DEBUG]', ...args);
    }
  },

  /**
   * Info level - development only
   */
  info: (...args) => {
    if (isDev || isDebug) {
      console.info('[INFO]', ...args);
    }
  },

  /**
   * Warning level - development only
   */
  warn: (...args) => {
    if (isDev || isDebug) {
      console.warn('[WARN]', ...args);
    }
  },

  /**
   * Error level - always logs
   */
  error: (...args) => {
    console.error('[ERROR]', ...args);
  },

  /**
   * Table - for debugging data structures
   */
  table: (data, columns) => {
    if (isDev || isDebug) {
      console.table(data, columns);
    }
  },

  /**
   * Group - for grouped logs
   */
  group: (label, fn) => {
    if (isDev || isDebug) {
      console.group(label);
      fn();
      console.groupEnd();
    }
  },
};

export default logger;
