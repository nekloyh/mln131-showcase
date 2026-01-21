/**
 * EndGameDialog Component
 * Shows when game ends - allows saving score to leaderboard
 * 
 * Features:
 * - Name input (2-20 chars, required for saving)
 * - Save button (disabled when name invalid)
 * - Don't Save button (always enabled)
 * - Loading/success/error states
 */
import React, { useState, useCallback, useEffect } from 'react';
import { NeoCard, NeoButton } from './NeobrutalUI';
import { submitScore } from '../../../../services/runnerQuizApi';

// Name validation rules
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 20;
const NAME_REGEX = /^[\p{L}\p{N}\s\-_.]+$/u;

export default function EndGameDialog({
  isOpen,
  score,
  level = 1,
  durationMs,
  runId,
  onClose,
  onSaved,
}) {
  const [playerName, setPlayerName] = useState('');
  const [saveState, setSaveState] = useState('idle'); // idle, saving, saved, error
  const [errorMessage, setErrorMessage] = useState('');

  // Reset state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setPlayerName('');
      setSaveState('idle');
      setErrorMessage('');
    }
  }, [isOpen]);

  // Validate name
  const isNameValid = useCallback(() => {
    const trimmed = playerName.trim();
    return (
      trimmed.length >= MIN_NAME_LENGTH &&
      trimmed.length <= MAX_NAME_LENGTH &&
      NAME_REGEX.test(trimmed)
    );
  }, [playerName]);

  // Handle save
  const handleSave = useCallback(async () => {
    if (!isNameValid()) return;
    if (saveState === 'saving' || saveState === 'saved') return;

    setSaveState('saving');
    setErrorMessage('');

    try {
      await submitScore({
        playerName: playerName.trim(),
        score,
        level,
        durationMs,
        runId,
      });

      setSaveState('saved');
      
      // Notify parent after brief delay for UX
      setTimeout(() => {
        onSaved?.();
      }, 1000);
    } catch (error) {
      console.error('[EndGameDialog] Save error:', error);
      setSaveState('error');

      if (error.message === 'DUPLICATE_SUBMISSION') {
        setErrorMessage('Score already saved for this game!');
        // Auto-close after duplicate (score was already saved)
        setTimeout(() => onSaved?.(), 1500);
      } else {
        setErrorMessage(error.message || 'Failed to save score');
      }
    }
  }, [playerName, score, level, durationMs, runId, isNameValid, saveState, onSaved]);

  // Handle don't save
  const handleDontSave = useCallback(() => {
    if (saveState === 'saving') return;
    onClose?.();
  }, [saveState, onClose]);

  // Handle enter key in input
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && isNameValid() && saveState === 'idle') {
      handleSave();
    }
  }, [isNameValid, saveState, handleSave]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <NeoCard className="w-full max-w-md text-center bg-[#FAF7F0] p-6 flex flex-col gap-5 items-center shadow-[16px_16px_0px_#000]">
        {/* Header */}
        <div className="bg-[#FF3B30] text-white px-4 py-1 text-sm font-black uppercase tracking-widest border-[3px] border-black shadow-[4px_4px_0px_#000] rotate-2">
          GAME OVER
        </div>

        <h2 className="text-4xl font-black uppercase text-black leading-none">
          {saveState === 'saved' ? '🎉 Saved!' : 'Save Your Score?'}
        </h2>

        {/* Score Display */}
        <div className="bg-black text-[#FFD400] p-5 border-[3px] border-gray-800 w-full shadow-[6px_6px_0px_#888]">
          <div className="text-xs text-gray-400 font-bold tracking-widest mb-1">FINAL SCORE</div>
          <div className="text-5xl font-black">{score.toLocaleString()}</div>
        </div>

        {/* Name Input */}
        {saveState !== 'saved' && (
          <div className="w-full">
            <label className="block text-left text-xs font-black uppercase tracking-widest text-gray-500 mb-2">
              Enter Your Name
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Your name..."
              maxLength={MAX_NAME_LENGTH}
              disabled={saveState === 'saving'}
              className={`
                w-full px-4 py-3 border-[3px] border-black bg-white
                text-lg font-bold text-center
                shadow-[4px_4px_0px_#000]
                focus:outline-none focus:shadow-[2px_2px_0px_#000] focus:translate-x-[2px] focus:translate-y-[2px]
                transition-all duration-100
                disabled:opacity-50 disabled:cursor-not-allowed
                ${playerName.trim().length > 0 && !isNameValid() ? 'border-red-500' : ''}
              `}
              autoFocus
            />
            {/* Character count */}
            <div className="flex justify-between mt-1 text-xs text-gray-400">
              <span>
                {playerName.trim().length > 0 && playerName.trim().length < MIN_NAME_LENGTH && (
                  <span className="text-red-500">Min {MIN_NAME_LENGTH} characters</span>
                )}
              </span>
              <span>{playerName.length}/{MAX_NAME_LENGTH}</span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="w-full px-3 py-2 bg-red-100 border-[2px] border-red-500 text-red-700 text-sm font-bold">
            {errorMessage}
          </div>
        )}

        {/* Success Message */}
        {saveState === 'saved' && (
          <div className="w-full px-3 py-2 bg-green-100 border-[2px] border-green-500 text-green-700 text-sm font-bold">
            ✅ Score saved to leaderboard!
          </div>
        )}

        {/* Buttons */}
        <div className="w-full flex flex-col gap-3">
          {saveState !== 'saved' && (
            <>
              <NeoButton
                onClick={handleSave}
                variant="primary"
                disabled={!isNameValid() || saveState === 'saving'}
                className={`
                  w-full py-3 text-lg
                  ${!isNameValid() ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {saveState === 'saving' ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span> Saving...
                  </span>
                ) : (
                  '💾 Save Score'
                )}
              </NeoButton>

              <NeoButton
                onClick={handleDontSave}
                variant="secondary"
                disabled={saveState === 'saving'}
                className="w-full py-3 text-lg"
              >
                Don't Save
              </NeoButton>
            </>
          )}

          {saveState === 'saved' && (
            <NeoButton
              onClick={onClose}
              variant="primary"
              className="w-full py-3 text-lg"
            >
              Continue
            </NeoButton>
          )}
        </div>
      </NeoCard>
    </div>
  );
}
