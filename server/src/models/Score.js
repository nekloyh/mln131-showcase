/**
 * Score Model - MongoDB/Mongoose
 * No migrations needed - schema is defined here!
 */
import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 20,
  },
  score: {
    type: Number,
    required: true,
    min: 0,
  },
  level: {
    type: Number,
    required: true,
    default: 1,
    min: 1,
  },
  durationMs: {
    type: Number,
    min: 0,
  },
  runId: {
    type: String,
    required: true,
    unique: true, // Prevents duplicate submissions
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
});

// Index for fast leaderboard queries: by level, then score descending
scoreSchema.index({ level: 1, score: -1, createdAt: 1 });

const Score = mongoose.model('Score', scoreSchema);

export default Score;
