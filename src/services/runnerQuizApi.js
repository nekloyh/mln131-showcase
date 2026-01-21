/**
 * Runner Quiz API Service
 * Handles all communication with the backend
 */

// API Base URL - configure based on environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

/**
 * Submit a score to the leaderboard
 * @param {Object} scoreData - Score submission data
 * @param {string} scoreData.playerName - Player's name (2-20 chars)
 * @param {number} scoreData.score - Final score
 * @param {number} scoreData.level - Level number (default: 1)
 * @param {number} [scoreData.durationMs] - Game duration in milliseconds
 * @param {string} scoreData.runId - Unique run identifier
 * @returns {Promise<Object>} - Created score record
 */
export async function submitScore(scoreData) {
  const response = await fetch(`${API_BASE_URL}/scores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(scoreData),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    
    // Handle specific error codes
    if (response.status === 409) {
      throw new Error('DUPLICATE_SUBMISSION');
    }
    if (response.status === 400) {
      throw new Error(error.details?.[0]?.message || 'Invalid score data');
    }
    if (response.status === 429) {
      throw new Error('Too many requests. Please wait a moment.');
    }
    
    throw new Error(error.message || 'Failed to submit score');
  }

  return response.json();
}

/**
 * Fetch leaderboard scores
 * @param {Object} options - Query options
 * @param {number} [options.level=1] - Level to fetch scores for
 * @param {number} [options.limit=10] - Number of scores to fetch (max 50)
 * @returns {Promise<Object>} - Leaderboard data with scores array
 */
export async function fetchLeaderboard(options = {}) {
  const { level = 1, limit = 10 } = options;
  
  const params = new URLSearchParams({
    level: level.toString(),
    limit: limit.toString(),
  });

  const response = await fetch(`${API_BASE_URL}/leaderboard?${params}`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to fetch leaderboard');
  }

  return response.json();
}

/**
 * Generate a unique run ID
 * Uses crypto.randomUUID() with fallback
 * @returns {string} - UUID string
 */
export function generateRunId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Check if the API is available
 * @returns {Promise<boolean>}
 */
export async function checkApiHealth() {
  try {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch {
    return false;
  }
}
