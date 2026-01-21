/**
 * Runner Quiz Backend Server
 * Express + MongoDB (Mongoose)
 */
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { connectDB } from './db/mongoose.js';
import scoresRouter from './routes/scores.js';

const app = express();
const PORT = process.env.PORT || 4000;

// --- Connect to MongoDB ---
await connectDB();

// --- CORS Configuration ---
const corsOrigins = process.env.CORS_ORIGIN?.split(',').map(o => o.trim()) || [
  'http://localhost:5173',
  'http://localhost:3000',
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (corsOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // In development, be more permissive
    if (process.env.NODE_ENV === 'development') {
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
  windowMs: 60 * 1000, // 1 minute
  max: 60, // 60 requests per minute
  message: {
    error: 'Too many requests',
    message: 'Please try again later',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter limit for score submission (anti-spam)
const scoreLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 score submissions per minute
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
  console.error('[Server Error]', err);

  // Don't expose internal errors in production
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : err.message;

  res.status(err.status || 500).json({
    error: 'Server error',
    message,
  });
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════╗
║     🎮 Runner Quiz Backend Server                 ║
╠═══════════════════════════════════════════════════╣
║  Status:  RUNNING                                 ║
║  Port:    ${PORT.toString().padEnd(38)}║
║  Env:     ${(process.env.NODE_ENV || 'development').padEnd(38)}║
║  CORS:    ${corsOrigins[0]?.substring(0, 35).padEnd(38)}║
╚═══════════════════════════════════════════════════╝
  `);
});

export default app;
