/**
 * Runner Quiz Backend Server
 * Express + MongoDB (Mongoose)
 */
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { connectDB } from './db/mongoose.js';
import scoresRouter from './routes/scores.js';

// ========== Configuration ==========
const config = {
  port: parseInt(process.env.PORT, 10) || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isDev: process.env.NODE_ENV !== 'production',
  isProd: process.env.NODE_ENV === 'production',
  
  // Rate limiting
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 60000,
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 60,
  scoreLimitMaxRequests: parseInt(process.env.SCORE_LIMIT_MAX_REQUESTS, 10) || 10,
  
  // CORS
  corsOrigins: process.env.CORS_ORIGIN?.split(',').map(o => o.trim()) || [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
  ],
  
  // Logging
  logLevel: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'error' : 'debug'),
};

const app = express();

// --- Connect to MongoDB ---
await connectDB();

// --- CORS Configuration ---
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (config.corsOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // In development, be more permissive
    if (config.isDev) {
      return callback(null, true);
    }
    
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

// --- Body Parser ---
app.use(express.json({ limit: '10kb' }));

// --- Rate Limiting ---
// General API rate limit
const apiLimiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.rateLimitMaxRequests,
  message: {
    error: 'Too many requests',
    message: 'Please try again later',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter limit for score submission (anti-spam)
const scoreLimiter = rateLimit({
  windowMs: config.rateLimitWindowMs,
  max: config.scoreLimitMaxRequests,
  message: {
    error: 'Too many submissions',
    message: 'Please wait before submitting another score',
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.ip || req.headers['x-forwarded-for'] || 'unknown';
  },
});

// Apply rate limiters
app.use('/api', apiLimiter);
app.use('/api/scores', scoreLimiter);

// --- Health Check ---
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.nodeEnv,
  });
});

// --- API Routes ---
app.use('/api', scoresRouter);

// --- 404 Handler ---
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// --- Global Error Handler ---
app.use((err, req, res, next) => {
  // Only log errors in development or if log level allows
  if (config.isDev || config.logLevel !== 'error') {
    console.error('[Server Error]', err);
  }

  // Don't expose internal errors in production
  const message = config.isProd
    ? 'Internal server error'
    : err.message;

  res.status(err.status || 500).json({
    error: 'Server error',
    message,
  });
});

// --- Start Server ---
app.listen(config.port, () => {
  console.log(`
╔═══════════════════════════════════════════════════╗
║     🎮 Runner Quiz Backend Server                 ║
╠═══════════════════════════════════════════════════╣
║  Status:  RUNNING                                 ║
║  Port:    ${config.port.toString().padEnd(38)}║
║  Env:     ${config.nodeEnv.padEnd(38)}║
║  CORS:    ${config.corsOrigins[0]?.substring(0, 35).padEnd(38)}║
╚═══════════════════════════════════════════════════╝
  `);
});

export default app;
