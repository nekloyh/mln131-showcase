/**
 * Application Configuration
 * Centralized configuration management with environment support
 */

// Environment detection
export const ENV = {
  isDev: import.meta.env.DEV || import.meta.env.VITE_NODE_ENV === 'development',
  isProd: import.meta.env.PROD || import.meta.env.VITE_NODE_ENV === 'production',
  isDebug: import.meta.env.VITE_DEBUG === 'true',
  mode: import.meta.env.MODE,
};

// API Configuration
export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  timeout: 30000, // 30 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
};

// App Metadata
export const APP_INFO = {
  name: 'MLN131 Showcase',
  version: typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '1.0.0',
  description: 'Chủ nghĩa xã hội khoa học - Website học tập',
};

// Feature Flags
export const FEATURES = {
  enableAI: true,
  enableLeaderboard: true,
  enableDebugPanel: ENV.isDev,
  enableMockData: !ENV.isProd && !import.meta.env.GROQ_API_KEY,
};

export default {
  ENV,
  API_CONFIG,
  APP_INFO,
  FEATURES,
};
