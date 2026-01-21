/**
 * Leaderboard Component
 * Displays top scores for Runner Quiz
 * 
 * Features:
 * - Fetches and displays top 10 scores
 * - Auto-refresh after save
 * - Loading and error states
 * - Highlights current player's score
 */
import React, { useState, useEffect, useCallback } from 'react';
import { fetchLeaderboard } from '../../../../services/runnerQuizApi';

// Medal colors for top 3
const MEDAL_COLORS = {
  1: 'bg-[#FFD700]', // Gold
  2: 'bg-[#C0C0C0]', // Silver
  3: 'bg-[#CD7F32]', // Bronze
};

export default function Leaderboard({
  level = 1,
  limit = 10,
  refreshTrigger = 0, // Increment to refresh
  highlightRunId = null, // Highlight this run if visible
  className = '',
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadLeaderboard = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchLeaderboard({ level, limit });
      setData(result);
    } catch (err) {
      console.error('[Leaderboard] Load error:', err);
      setError(err.message || 'Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  }, [level, limit]);

  // Load on mount and when refreshTrigger changes
  useEffect(() => {
    loadLeaderboard();
  }, [loadLeaderboard, refreshTrigger]);

  // Render loading state
  if (loading && !data) {
    return (
      <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
        <div className="text-gray-500 font-bold animate-pulse">Loading leaderboard...</div>
      </div>
    );
  }

  // Render error state
  if (error && !data) {
    return (
      <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
        <div className="text-red-500 font-bold mb-2">⚠️ {error}</div>
        <button
          onClick={loadLeaderboard}
          className="px-3 py-1 bg-gray-200 border-2 border-black text-sm font-bold hover:bg-gray-300"
        >
          Retry
        </button>
      </div>
    );
  }

  // Render empty state
  if (!data?.scores?.length) {
    return (
      <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
        <div className="text-gray-400 font-bold text-center">
          No scores yet!<br />
          <span className="text-sm">Be the first to play!</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#FFD400] border-b-[3px] border-black">
        <span className="font-black uppercase tracking-widest text-sm text-black">
          🏆 Leaderboard
        </span>
        {loading && (
          <span className="text-xs text-black/50 animate-pulse">Updating...</span>
        )}
      </div>

      {/* Scores List */}
      <div className="flex-1 overflow-y-auto max-h-[300px]">
        {data.scores.map((score, index) => {
          const rank = score.rank || index + 1;
          const isHighlighted = highlightRunId && score.runId === highlightRunId;
          const medalColor = MEDAL_COLORS[rank];

          return (
            <div
              key={score.id}
              className={`
                flex items-center gap-3 px-3 py-2 border-b-[2px] border-black/10
                ${isHighlighted ? 'bg-[#4D9DE0]/20' : rank % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                ${isHighlighted ? 'border-[#4D9DE0] border-l-4' : ''}
              `}
            >
              {/* Rank */}
              <div
                className={`
                  w-8 h-8 flex items-center justify-center
                  border-[2px] border-black font-black text-sm
                  ${medalColor || 'bg-white'}
                `}
              >
                {rank <= 3 ? ['🥇', '🥈', '🥉'][rank - 1] : rank}
              </div>

              {/* Name */}
              <div className="flex-1 min-w-0">
                <div className={`font-bold truncate ${isHighlighted ? 'text-[#4D9DE0]' : 'text-black'}`}>
                  {score.playerName}
                </div>
                <div className="text-[10px] text-gray-400">
                  {new Date(score.createdAt).toLocaleDateString()}
                </div>
              </div>

              {/* Score */}
              <div className="text-right">
                <div className="font-black text-lg font-mono">
                  {score.score.toLocaleString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
