/**
 * Scores API Routes
 * POST /api/scores - Submit a new score
 * GET /api/leaderboard - Get top scores
 */
import { Router } from 'express';
import Score from '../models/Score.js';
import {
  scoreSubmitSchema,
  leaderboardQuerySchema,
  validateBody,
  validateQuery,
} from '../validation/schemas.js';

const router = Router();

/**
 * POST /api/scores
 * Submit a new score to the leaderboard
 */
router.post(
  '/scores',
  validateBody(scoreSubmitSchema),
  async (req, res, next) => {
    try {
      const { playerName, score, level, durationMs, runId } = req.body;

      // Create new score document
      const newScore = await Score.create({
        playerName,
        score,
        level,
        durationMs,
        runId,
      });

      console.log(`[Scores] New score saved: ${playerName} - ${score} pts (runId: ${runId})`);

      return res.status(201).json({
        id: newScore._id,
        playerName: newScore.playerName,
        score: newScore.score,
        level: newScore.level,
        durationMs: newScore.durationMs,
        runId: newScore.runId,
        createdAt: newScore.createdAt,
      });
    } catch (error) {
      // Handle duplicate runId (MongoDB error code 11000 = duplicate key)
      if (error.code === 11000 && error.keyPattern?.runId) {
        return res.status(409).json({
          error: 'Duplicate submission',
          message: 'This game run has already been submitted',
        });
      }

      console.error('[Scores] Error saving score:', error);
      next(error);
    }
  }
);

/**
 * GET /api/leaderboard
 * Get top scores for a specific level
 * Query params:
 *   - level: number (default: 1)
 *   - limit: number (default: 10, max: 50)
 */
router.get(
  '/leaderboard',
  validateQuery(leaderboardQuerySchema),
  async (req, res, next) => {
    try {
      const { level, limit } = req.query;

      const scores = await Score.find({ level })
        .sort({ score: -1, createdAt: 1 }) // High score first, then earliest
        .limit(limit)
        .select('playerName score level durationMs createdAt')
        .lean();

      // Add rank to each score
      const rankedScores = scores.map((score, index) => ({
        rank: index + 1,
        id: score._id,
        playerName: score.playerName,
        score: score.score,
        level: score.level,
        durationMs: score.durationMs,
        createdAt: score.createdAt,
      }));

      return res.json({
        level,
        limit,
        total: rankedScores.length,
        scores: rankedScores,
      });
    } catch (error) {
      console.error('[Leaderboard] Error fetching scores:', error);
      next(error);
    }
  }
);

export default router;
