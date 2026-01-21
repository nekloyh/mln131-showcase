/**
 * Zod Validation Schemas for Runner Quiz API
 */
import { z } from 'zod';

// Player name: trim, 2-20 chars, no control characters
const playerNameSchema = z
  .string()
  .trim()
  .min(2, 'Name must be at least 2 characters')
  .max(20, 'Name must be at most 20 characters')
  .regex(/^[\p{L}\p{N}\s\-_.]+$/u, 'Name contains invalid characters');

// Score submission schema
export const scoreSubmitSchema = z.object({
  playerName: playerNameSchema,
  score: z
    .number()
    .int('Score must be an integer')
    .min(0, 'Score must be non-negative')
    .max(1_000_000_000, 'Score exceeds maximum allowed'),
  level: z
    .number()
    .int('Level must be an integer')
    .min(1, 'Level must be at least 1')
    .default(1),
  durationMs: z
    .number()
    .int('Duration must be an integer')
    .min(0, 'Duration must be non-negative')
    .optional(),
  runId: z
    .string()
    .min(8, 'runId must be at least 8 characters')
    .max(64, 'runId must be at most 64 characters'),
});

// Leaderboard query params schema
export const leaderboardQuerySchema = z.object({
  level: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .pipe(z.number().int().min(1)),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .pipe(z.number().int().min(1).max(50)),
});

/**
 * Validation middleware factory
 */
export function validateBody(schema) {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        });
      }
      next(error);
    }
  };
}

export function validateQuery(schema) {
  return (req, res, next) => {
    try {
      req.query = schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: 'Validation failed',
          details: error.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        });
      }
      next(error);
    }
  };
}
