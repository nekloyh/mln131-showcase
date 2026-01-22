import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Runner3DScene from './Runner3DScene';
import questionsData from '../questions.json';
import ErrorBoundary from '../../../../components/ui/ErrorBoundary';
import { quizController } from './QuizController';
import { NeoFrame, NeoCard, NeoButton, NeoPill, NeoHeart, NeoProgressBar } from './NeobrutalUI';
import EndGameDialog from './EndGameDialog';
import Leaderboard from './Leaderboard';
import { generateRunId } from '../../../../services/runnerQuizApi';
import { GAME_CONFIG } from '../gameConfig';

export default function RunnerQuiz3D({ onClose }) {
    // --- State ---
    const [gameState, setGameState] = useState('RUNNING'); // RUNNING, QUESTION_GATE, RESOLVING, GAMEOVER, SAVE_DIALOG
    const [score, setScore] = useState(0);
    const [hearts, setHearts] = useState(GAME_CONFIG.MAX_HEARTS);
    const [gameKey, setGameKey] = useState(0); // Used to reset 3D scene on restart

    // Progression Stats
    const [questionCount, setQuestionCount] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);

    // Run tracking for leaderboard
    const [runId, setRunId] = useState(() => generateRunId());
    const [gameStartTime, setGameStartTime] = useState(() => Date.now());
    const [leaderboardRefresh, setLeaderboardRefresh] = useState(0);

    // Quiz State (Synced from Controller)
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [spawnSignal, setSpawnSignal] = useState(false);
    const [feedback, setFeedback] = useState(null); // 'CORRECT', 'WRONG' (+ details)
    const [quizProgress, setQuizProgress] = useState(1.0);
    
    // NEW: Current question score (displayed in UI - updates in real-time)
    const [currentQuestionScore, setCurrentQuestionScore] = useState(0);
    
    // NEW: Current time limit for display
    const [currentTimeLimit, setCurrentTimeLimit] = useState(GAME_CONFIG.TIMING.QUESTION_TIME_LIMIT);
    
    // Ref to store currentTimeLimit for use in callbacks (avoids stale closure)
    const currentTimeLimitRef = useRef(GAME_CONFIG.TIMING.QUESTION_TIME_LIMIT);

    // Keep a ref to the current question for immediate access
    const currentQuestionRef = useRef(null);

    // Player State
    const [gameSpeed, setGameSpeed] = useState(GAME_CONFIG.SPEED.NORMAL);
    const [wallBoost, setWallBoost] = useState(1); // NEW: Wall boost for early answers
    const [playerLane, setPlayerLane] = useState(1); // 0 (A), 1 (B), 2 (C), 3 (D)

    // --- Quiz Controller Sync ---
    useEffect(() => {
        // Subscribe to Controller updates
        quizController.onStateChange = (state) => {
            if (state.isOpen) {
                console.log('[RunnerQuiz] Controller State OPEN:', state.question.id);
                // Don't set activeQuestion here - it's already set directly in triggerSpawn
                setQuizProgress(1.0);
                // Reset score display when new question opens
                setCurrentQuestionScore(GAME_CONFIG.SCORING.MAX_SCORE);
            } else {
                console.log('[RunnerQuiz] Controller State CLOSED');
                // Don't clear activeQuestion here - let the game flow handle it
                // This prevents the question from disappearing while showing feedback
            }
        };

        quizController.onTick = (remaining, progress) => {
            setQuizProgress(progress);
            // Update real-time score display based on remaining time (use ref for fresh value)
            const potentialScore = GAME_CONFIG.SCORING.calculateScore(remaining, currentTimeLimitRef.current);
            setCurrentQuestionScore(potentialScore);
        };

        quizController.onTimeOut = () => {
            // Handle Timeout: Deduct heart, show feedback
            console.log('[RunnerQuiz] Question Timeout!');
            setHearts(prev => prev - 1);
            setFeedback({ type: 'WRONG', score: GAME_CONFIG.SCORING.TIMEOUT_SCORE });
            setCurrentQuestionScore(0);
            setGameState('RESOLVING');
            setGameSpeed(GAME_CONFIG.SPEED.SLOW_MO);
            setWallBoost(1); // Reset wall boost

            // Close quiz logic after delay
            setTimeout(() => {
                handleResolveComplete(false);
            }, GAME_CONFIG.TIMING.FEEDBACK_DURATION);
        };

        // Cleanup on unmount
        return () => {
            quizController.destroy();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // --- Input Handling ---
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (gameState === 'GAMEOVER' || gameState === 'RESOLVING') return;

            switch (e.key) {
                // Left
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    setPlayerLane(prev => Math.max(0, prev - 1));
                    break;
                // Right
                case 'ArrowRight':
                case 'd':
                case 'D':
                    setPlayerLane(prev => Math.min(3, prev + 1));
                    break;
                // Manual Answer (Space / Enter)
                case ' ':
                case 'Enter':
                    handleManualAnswer();
                    break;
                // Close / Escape
                case 'Escape':
                    onClose();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameState, onClose, playerLane]); // Added playerLane dependency for manual answer

    // --- Action Handlers ---
    // (Moved to useCallback below)

    // --- Game Loop / Quiz Spawning ---
    // Use ref to store the question for spawn signal (avoids React batching issues)
    const pendingQuestionRef = useRef(null);
    const hasSpawnedFirstRef = useRef(false);

    useEffect(() => {
        let interval;
        let firstSpawnTimeout;

        if (gameState === 'RUNNING') {
            const triggerSpawn = () => {
                const randomQ = questionsData[Math.floor(Math.random() * questionsData.length)];

                console.log('[RunnerQuiz] Trigger Spawn:', randomQ.id, randomQ.question);

                // Calculate Dynamic Time Limit based on Correct Answers
                const difficultyMultiplier = 1 + (correctCount * GAME_CONFIG.DIFFICULTY.TIME_REDUCTION_PER_CORRECT);
                const clampedMultiplier = Math.min(difficultyMultiplier, GAME_CONFIG.DIFFICULTY.MAX_DIFFICULTY_MULTIPLIER);
                const dynamicTimeLimit = Math.max(
                    GAME_CONFIG.TIMING.MIN_TIME_LIMIT,
                    GAME_CONFIG.TIMING.QUESTION_TIME_LIMIT / clampedMultiplier
                );

                console.log(`[Difficulty] correct=${correctCount}, multiplier=${clampedMultiplier.toFixed(2)}, time=${dynamicTimeLimit.toFixed(0)}ms`);

                // Store time limit for score calculation and display
                setCurrentTimeLimit(dynamicTimeLimit);
                currentTimeLimitRef.current = dynamicTimeLimit;

                // Store question in ref IMMEDIATELY for render access
                pendingQuestionRef.current = randomQ;
                currentQuestionRef.current = randomQ;

                // 1. Open Quiz in Controller (Starts Timer)
                quizController.open(randomQ, dynamicTimeLimit);

                // 2. Set all states
                setQuestionCount(prev => prev + 1); // Increment Question Number
                setActiveQuestion(randomQ);
                setGameState('QUESTION_GATE');
                setSpawnSignal(true);
                setWallBoost(1); // Reset wall boost for new question
                setGameSpeed(GAME_CONFIG.SPEED.QUESTION_ACTIVE); // Accelerate!
                setCurrentQuestionScore(GAME_CONFIG.SCORING.MAX_SCORE); // Start with max score

                console.log('[RunnerQuiz] States updated, question:', randomQ.question);

                setTimeout(() => setSpawnSignal(false), 100);
            };

            // Spawn first question after a short delay (let player get ready)
            if (!hasSpawnedFirstRef.current) {
                hasSpawnedFirstRef.current = true;
                firstSpawnTimeout = setTimeout(triggerSpawn, GAME_CONFIG.TIMING.FIRST_QUESTION_DELAY);
            }

            interval = setInterval(triggerSpawn, GAME_CONFIG.TIMING.QUESTION_INTERVAL);
        }
        return () => {
            clearInterval(interval);
            clearTimeout(firstSpawnTimeout);
        };
    }, [gameState, correctCount]); // Added correctCount dependency

    // --- Completion Handler ---
    const handleResolveComplete = useCallback(() => { // Removed unused playerDied
        setHearts(currentHearts => {
            if (currentHearts <= 0) {
                setGameState('SAVE_DIALOG'); // Show save dialog instead of direct game over
                setActiveQuestion(null);
                currentQuestionRef.current = null;
                setCurrentQuestionScore(0);
                setWallBoost(1); // Reset wall boost
                quizController.close('gameover');
                return 0;
            } else {
                setGameState('RUNNING');
                setFeedback(null);
                setActiveQuestion(null); // Clear question when returning to running
                currentQuestionRef.current = null;
                setGameSpeed(GAME_CONFIG.SPEED.NORMAL);
                setWallBoost(1); // Reset wall boost
                setCurrentQuestionScore(0); // Reset score display
                quizController.close('resolved');
                return currentHearts;
            }
        });
    }, []);

    // --- Action Handlers ---

    // Shared "Check Answer" Logic
    const resolveAnswer = useCallback((isManual, laneIndex) => {
        if (!quizController.activeQuestion) return;

        // Valid Check
        const result = quizController.checkAnswer(laneIndex);
        const { isCorrect, timeLeft } = result;

        // IMMEDIATE CLOSE to prevent double triggers (wall + key)
        quizController.close('answered');

        setGameState('RESOLVING');
        
        // If answered early (manual), boost wall speed to reach player faster
        if (isManual) {
            setWallBoost(GAME_CONFIG.SPEED.WALL_BOOST_MULTIPLIER);
            setGameSpeed(GAME_CONFIG.SPEED.SLOW_MO); // Slight slow-mo for visual effect
        } else {
            setGameSpeed(GAME_CONFIG.SPEED.SLOW_MO); // Slow mo impact
            setWallBoost(1);
        }

        if (isCorrect) {
            // Increment Difficulty Stat
            setCorrectCount(prev => prev + 1);

            // Calculate score using new formula (200-500 range)
            const totalScore = GAME_CONFIG.SCORING.calculateScore(timeLeft, currentTimeLimitRef.current);

            console.log(`[RunnerQuiz] Correct! TimeLeft: ${timeLeft}ms, Score: ${totalScore}`);

            setScore(prev => prev + totalScore);
            setCurrentQuestionScore(totalScore);
            setFeedback({ type: 'CORRECT', score: totalScore });
        } else {
            console.log('[RunnerQuiz] Wrong!');
            setHearts(prev => prev - 1);
            setCurrentQuestionScore(GAME_CONFIG.SCORING.WRONG_SCORE);
            setFeedback({ type: 'WRONG', score: GAME_CONFIG.SCORING.WRONG_SCORE });
        }

        // Cleanup Delay
        setTimeout(() => {
            handleResolveComplete();
        }, GAME_CONFIG.TIMING.FEEDBACK_DURATION);
    }, [handleResolveComplete]); // Added dependency

    const handleManualAnswer = useCallback(() => {
        // Only allow manual answer if quiz is active
        if (gameState !== 'QUESTION_GATE') return;
        console.log('[RunnerQuiz] Manual Answer Triggered at Lane:', playerLane);
        resolveAnswer(true, playerLane);
    }, [gameState, playerLane, resolveAnswer]);

    // --- Input Handling ---
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (gameState === 'GAMEOVER' || gameState === 'RESOLVING') return;

            switch (e.key) {
                // Left
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    setPlayerLane(prev => Math.max(0, prev - 1));
                    break;
                // Right
                case 'ArrowRight':
                case 'd':
                case 'D':
                    setPlayerLane(prev => Math.min(3, prev + 1));
                    break;
                // Manual Answer (Space / Enter)
                case ' ':
                case 'Enter':
                    handleManualAnswer();
                    break;
                // Close / Escape
                case 'Escape':
                    onClose();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameState, onClose, playerLane, handleManualAnswer]); // Added handleManualAnswer dependency

    // --- Callbacks ---
    const handleWallHit = useCallback((wallId, laneIndex) => {
        // Wall hit only triggers if Controller is still open.
        // If Manual Answer happened first, Controller is closed, so this is ignored.
        console.log('[RunnerQuiz] Wall Hit Triggered at Lane:', laneIndex);
        resolveAnswer(false, laneIndex);
    }, [resolveAnswer]); // Added resolveAnswer dependency
    const handleRestart = () => {
        quizController.close('restart');
        setScore(0);
        setHearts(GAME_CONFIG.MAX_HEARTS);
        setGameSpeed(GAME_CONFIG.SPEED.NORMAL);
        setWallBoost(1); // Reset wall boost
        setPlayerLane(1);
        setActiveQuestion(null);
        currentQuestionRef.current = null;
        setCurrentTimeLimit(GAME_CONFIG.TIMING.QUESTION_TIME_LIMIT);
        currentTimeLimitRef.current = GAME_CONFIG.TIMING.QUESTION_TIME_LIMIT;
        setSpawnSignal(false);
        setFeedback(null);
        setQuizProgress(1.0);
        setCurrentQuestionScore(0); // Reset score display
        pendingQuestionRef.current = null;
        hasSpawnedFirstRef.current = false; // Reset first spawn flag
        setGameKey(prev => prev + 1); // Force 3D scene to remount and reset walls
        setGameState('RUNNING');

        // Reset Progression
        setQuestionCount(0);
        setCorrectCount(0);

        // Reset run tracking for new game
        setRunId(generateRunId());
        setGameStartTime(Date.now());
    };

    // --- Save Dialog Handlers ---
    const handleSaveComplete = useCallback(() => {
        setLeaderboardRefresh(prev => prev + 1); // Refresh leaderboard
        setGameState('GAMEOVER'); // Go to final game over screen
    }, []);

    const handleSkipSave = useCallback(() => {
        setGameState('GAMEOVER'); // Go to final game over screen without saving
    }, []);

    // --- Render ---
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 font-sans select-none">

            {/* MAIN WINDOW CONTAINER - Updated to ~80% Screen Size directly */}
            <NeoFrame className="w-[85vw] h-[85vh] max-w-none max-h-none" title="RUNNER QUIZ">

                {/* --- LEFT COLUMN: MAIN AREA (Quiz + Game) --- */}
                {/* 70-78% width (flex-1) */}
                <div className="flex-1 flex flex-col relative border-r-[4px] border-black overflow-hidden bg-black">

                    {/* (A) QUIZ PANEL (Top Section) */}
                    {/* Persistent Container: ALWAYS VISIBLE - No Slide Logic */}
                    <div className="flex flex-col bg-[#FAF7F0] border-b-[4px] border-black z-20 shrink-0">
                        {/* Quiz Header Bar with Score Display */}
                        <div className="flex bg-[#FFD400] text-black border-b-[3px] border-black px-4 py-2 justify-between items-center gap-3">
                            <span className="font-black uppercase tracking-widest text-sm shrink-0">
                                {activeQuestion ? `QUESTION ${questionCount.toString().padStart(2, '0')}` : "CHECKPOINT AHEAD"}
                            </span>
                            
                            {/* Score Display - Shows potential score in real-time */}
                            <div className={`flex items-center gap-2 border-[2px] border-black px-3 py-1 font-mono font-black text-sm shrink-0 transition-colors ${
                                activeQuestion 
                                    ? (quizProgress > 0.5 ? 'bg-[#00C853] text-white' : quizProgress > 0.25 ? 'bg-[#FFD400] text-black' : 'bg-[#FF3B30] text-white')
                                    : 'bg-white text-gray-400'
                            }`}>
                                <span className="text-[10px] uppercase opacity-70">PTS</span>
                                <span className="tabular-nums">
                                    {activeQuestion && gameState === 'QUESTION_GATE' ? `+${currentQuestionScore}` : '---'}
                                </span>
                            </div>
                            
                            {/* Timer Bar - Fixed logic */}
                            <div className="flex-1 h-4 border-[2px] border-black bg-white relative overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-100 ease-linear ${
                                        !activeQuestion ? 'bg-gray-200' :
                                        quizProgress > 0.5 ? 'bg-[#00C853]' : 
                                        quizProgress > 0.25 ? 'bg-[#FFD400]' : 
                                        'bg-[#FF3B30]'
                                    }`}
                                    style={{ 
                                        width: `${activeQuestion && gameState === 'QUESTION_GATE' ? Math.max(0, Math.min(100, quizProgress * 100)) : 0}%`,
                                    }}
                                />
                                {/* Time indicator overlay */}
                                {activeQuestion && gameState === 'QUESTION_GATE' && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-[10px] font-black text-black/60">
                                            {Math.ceil((quizProgress * currentTimeLimit) / 1000)}s
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Question & Answers Area */}
                        <div className="p-4 flex flex-col gap-4">
                            {/* Question */}
                            <div className="text-lg md:text-xl font-black leading-tight text-center min-h-[3rem] flex items-center justify-center">
                                {activeQuestion ? activeQuestion.question : <span className="opacity-40 tracking-widest">AWAITING NEXT QUESTION...</span>}
                            </div>

                            {/* (B) Answer Grid 2x2 */}
                            <div className="grid grid-cols-2 gap-3 h-[140px]">
                                {activeQuestion ? (
                                    activeQuestion.choices.map((choice, i) => {
                                        const laneLetter = ['A', 'B', 'C', 'D'][i];
                                        const isSelected = playerLane === i;

                                        // Determine visual state
                                        let btnStateClass = 'bg-white text-gray-800 hover:bg-gray-100'; // Default

                                        if (isSelected) {
                                            // Default Selected State
                                            btnStateClass = 'bg-[#4D9DE0] text-white shadow-none translate-y-[2px] translate-x-[2px]';

                                            // Feedback State override
                                            if (gameState === 'RESOLVING' && feedback) {
                                                if (feedback.type === 'CORRECT') btnStateClass = 'bg-[#00C853] text-white';
                                                else btnStateClass = 'bg-[#FF3B30] text-white';
                                            }
                                        }

                                        return (
                                            <button
                                                key={i}
                                                // Clicking also sets lane for mobile/mouse users
                                                onClick={() => {
                                                    if (gameState === 'QUESTION_GATE') setPlayerLane(i);
                                                }}
                                                className={`
                                                    relative flex flex-col items-center justify-center p-2 border-[3px] border-black
                                                    shadow-[4px_4px_0px_#000] transition-all duration-100 text-center
                                                    ${btnStateClass}
                                                `}
                                            >
                                                <div className="absolute top-1 left-2 text-[10px] font-black uppercase text-black/50">{laneLetter}</div>
                                                <span className="font-bold text-sm md:text-base leading-none pointer-events-none">{choice}</span>
                                            </button>
                                        );
                                    })
                                ) : (
                                    // Empty State (Placeholder Grid)
                                    Array.from({ length: 4 }).map((_, i) => (
                                        <div key={i} className="border-[3px] border-black/10 bg-black/5 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-black/10" />
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* (C) GAME VIEW (Bottom Section / Fill Rest) */}
                    <div className="flex-1 relative w-full h-full">
                        <ErrorBoundary>
                            <Canvas shadows dpr={[1, 1.5]} key={gameKey} className="w-full h-full block">
                                <Suspense fallback={null}>
                                    <Runner3DScene
                                        activeQuestion={activeQuestion}
                                        spawnSignal={spawnSignal}
                                        onWallHit={handleWallHit}
                                        playerLane={playerLane}
                                        gameSpeed={gameSpeed}
                                        wallBoost={wallBoost}
                                        isQuizActive={gameState === 'QUESTION_GATE'}
                                    />
                                </Suspense>
                            </Canvas>
                        </ErrorBoundary>

                        {/* Feedback Overlay (Centered on Game View) */}
                        {feedback && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 animate-in zoom-in-0 duration-300">
                                {/* INCREASED SIZE AND IMPACT */}
                                <div className={`
                                    border-[8px] border-black p-12 shadow-[20px_20px_0px_#000] transform rotate-[-3deg]
                                    ${feedback.type === 'CORRECT' ? 'bg-[#00C853]' : 'bg-[#FF3B30]'}
                                `}>
                                    <div className="text-8xl font-black italic text-white drop-shadow-[8px_8px_0px_#000] whitespace-nowrap tracking-tighter">
                                        {feedback.type === 'CORRECT' ? 'PERFECT!' : 'WRONG!'}
                                    </div>
                                    {feedback.score !== undefined && feedback.type === 'CORRECT' && (
                                        <div className="mt-4 text-center text-white font-mono font-black text-4xl drop-shadow-[4px_4px_0px_#000]">
                                            +{feedback.score} PTS
                                        </div>
                                    )}
                                    {feedback.type === 'WRONG' && (
                                        <div className="mt-4 text-center text-white font-mono font-black text-2xl drop-shadow-[4px_4px_0px_#000] opacity-80">
                                            0 PTS
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- RIGHT COLUMN: SIDE PANEL --- */}
                {/* Fixed Width 280-320px */}
                <div className="w-[300px] h-full bg-[#FAF7F0] flex flex-col shrink-0 z-10 relative">

                    {/* (A) Header */}
                    <div className="p-4 border-b-[3px] border-black bg-white">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">CURRENT ROUND</span>
                            <div className="text-2xl font-black">
                                QUESTION {questionCount.toString().padStart(2, '0')}
                            </div>
                        </div>
                    </div>

                    {/* (B) Stats Panel (Vùng trống dưới phải) */}
                    <div className="flex-1 p-4 flex flex-col gap-6">

                        {/* Stats: Lives */}
                        <div className="flex flex-col gap-2">
                            <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">HEARTS</div>
                            <div className="flex flex-wrap gap-2">
                                {Array.from({ length: GAME_CONFIG.MAX_HEARTS }).map((_, i) => (
                                    <NeoHeart key={i} active={i < hearts} />
                                ))}
                            </div>
                        </div>

                        {/* Stats: Score */}
                        <div className="flex flex-col gap-2">
                            <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">TOTAL SCORE</div>
                            <div className="border-[3px] border-black bg-white p-3 shadow-[4px_4px_0px_#000]">
                                <div className="text-4xl font-black font-mono text-right tracking-tighter text-black">
                                    {score.toString().padStart(5, '0')}
                                </div>
                            </div>
                        </div>

                        {/* Leaderboard - replaces decoration filler */}
                        <div className="flex-1 flex flex-col min-h-0 border-[3px] border-black bg-white shadow-[4px_4px_0px_#000]">
                            <Leaderboard
                                level={1}
                                limit={10}
                                refreshTrigger={leaderboardRefresh}
                                className="flex-1"
                            />
                        </div>

                        {/* Controls hint */}
                        <div className="opacity-30 pt-2">
                            <div className="text-[10px] font-black uppercase text-center mb-1">CONTROLS</div>
                            <div className="grid grid-cols-4 gap-1 text-center text-xs font-bold font-mono">
                                <div className="border border-black p-1">←</div>
                                <div className="border border-black p-1">→</div>
                                <div className="border border-black p-1 col-span-2">SPACE</div>
                            </div>
                        </div>
                    </div>

                    {/* Footer / Exit */}
                    <div className="p-4 border-t-[3px] border-black bg-white">
                        <NeoButton
                            onClick={onClose}
                            variant="danger"
                            className="w-full text-sm py-2 shadow-[3px_3px_0px_#000]"
                        >
                            EXIT
                        </NeoButton>
                    </div>

                </div>

                {/* SAVE SCORE DIALOG (Shows after game over) */}
                {gameState === 'SAVE_DIALOG' && (
                    <EndGameDialog
                        isOpen={true}
                        score={score}
                        level={1}
                        durationMs={Date.now() - gameStartTime}
                        runId={runId}
                        onClose={handleSkipSave}
                        onSaved={handleSaveComplete}
                    />
                )}

                {/* GAME OVER OVERLAY (Shows after save dialog) */}
                {gameState === 'GAMEOVER' && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                        <NeoCard className="w-full max-w-lg text-center bg-[#FAF7F0] p-6 flex flex-col gap-6 items-center shadow-[16px_16px_0px_#000]">
                            <div className="bg-[#FF3B30] text-white px-4 py-1 text-sm font-black uppercase tracking-widest border-[3px] border-black shadow-[4px_4px_0px_#000] rotate-2">
                                TERMINATED
                            </div>

                            <h2 className="text-5xl font-black uppercase text-black leading-none mt-2">Game Over</h2>

                            <div className="bg-black text-[#FFD400] p-6 border-[3px] border-gray-800 w-full shadow-[6px_6px_0px_#888]">
                                <div className="text-xs text-gray-400 font-bold tracking-widest mb-1">FINAL SCORE</div>
                                <div className="text-6xl font-black">{score.toLocaleString()}</div>
                            </div>

                            {/* Mini Leaderboard in Game Over */}
                            <div className="w-full border-[3px] border-black bg-white max-h-[200px] overflow-hidden">
                                <Leaderboard
                                    level={1}
                                    limit={5}
                                    refreshTrigger={leaderboardRefresh}
                                    highlightRunId={runId}
                                />
                            </div>

                            <NeoButton onClick={handleRestart} variant="primary" className="w-full py-4 text-xl">
                                TRY AGAIN
                            </NeoButton>
                        </NeoCard>
                    </div>
                )}

            </NeoFrame>
        </div>
    );
}
