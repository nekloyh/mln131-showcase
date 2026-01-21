import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Runner3DScene from './Runner3DScene';
import questionsData from '../questions.json';
import ErrorBoundary from '../../../../components/ui/ErrorBoundary';

// --- Game Logic Config ---
const GAME_CONFIG = {
    MAX_HEARTS: 3,
    SPAWN_INTERVAL: 8000,
    BASE_SCORE: 100,
    QUESTION_TIME_LIMIT: 10, // seconds
    SPEED_NORMAL: 1.0,
    SPEED_FAST: 1.3, // 30% faster during question phase
};

export default function RunnerQuiz3D({ onClose }) {
    // --- State ---
    const [gameState, setGameState] = useState('RUNNING'); // RUNNING, QUESTION_GATE, RESOLVING, GAMEOVER
    const [score, setScore] = useState(0);
    const [hearts, setHearts] = useState(GAME_CONFIG.MAX_HEARTS);

    // Quiz State
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [questionStartTime, setQuestionStartTime] = useState(0);
    const [spawnSignal, setSpawnSignal] = useState(false);
    const [feedback, setFeedback] = useState(null); // 'CORRECT', 'WRONG' (+ details)

    // Player State
    const [gameSpeed, setGameSpeed] = useState(GAME_CONFIG.SPEED_NORMAL);
    const [playerLane, setPlayerLane] = useState(1); // 0 (A), 1 (B), 2 (C), 3 (D)

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
                // Dash / Speed Up (Optional feedback)
                // We removed Jumping. Space can just trigger a visual "dash" maybe?
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameState]);

    // --- Game Loop / Quiz Spawning ---
    useEffect(() => {
        let interval;
        if (gameState === 'RUNNING') {
            const triggerSpawn = () => {
                const randomQ = questionsData[Math.floor(Math.random() * questionsData.length)];
                setActiveQuestion(randomQ);
                setQuestionStartTime(Date.now());
                setGameState('QUESTION_GATE');
                setSpawnSignal(true);
                setGameSpeed(GAME_CONFIG.SPEED_FAST); // Accelerate!

                setTimeout(() => setSpawnSignal(false), 100);
            };

            interval = setInterval(triggerSpawn, GAME_CONFIG.SPAWN_INTERVAL);
        }
        return () => clearInterval(interval);
    }, [gameState]);

    // --- Scoring Logic ---
    const calculateScore = useCallback(() => {
        const now = Date.now();
        const elapsedSec = (now - questionStartTime) / 1000;
        const timeLeft = Math.max(0, GAME_CONFIG.QUESTION_TIME_LIMIT - elapsedSec);

        // Bonus: 0 to 100 based on time left
        // If answered instantly (timeLeft ~ 10): bonus = 100
        // If answered at last second (timeLeft ~ 0): bonus = 0
        const bonus = Math.floor((timeLeft / GAME_CONFIG.QUESTION_TIME_LIMIT) * 100);

        return GAME_CONFIG.BASE_SCORE + bonus;
    }, [questionStartTime]);

    // --- Callbacks ---
    const handleWallHit = useCallback((wallId, laneIndex) => {
        if (!activeQuestion) return;

        const isCorrect = laneIndex === activeQuestion.answerIndex;
        setGameState('RESOLVING');
        setGameSpeed(0.5); // Slow mo impact

        if (isCorrect) {
            const gainedScore = calculateScore();
            setScore(prev => prev + gainedScore);
            setFeedback({ type: 'CORRECT', score: gainedScore });
        } else {
            setHearts(prev => prev - 1);
            setFeedback({ type: 'WRONG' });
        }

        // Return to normal
        setTimeout(() => {
            if (hearts <= 1 && !isCorrect) {
                setGameState('GAMEOVER');
            } else {
                setGameState('RUNNING');
                setActiveQuestion(null);
                setFeedback(null);
                setGameSpeed(GAME_CONFIG.SPEED_NORMAL);
            }
        }, 1500);

    }, [activeQuestion, hearts, calculateScore]);

    const handleRestart = () => {
        setScore(0);
        setHearts(GAME_CONFIG.MAX_HEARTS);
        setGameSpeed(GAME_CONFIG.SPEED_NORMAL);
        setPlayerLane(1);
        setGameState('RUNNING');
        setActiveQuestion(null);
        setFeedback(null);
    };

    // --- Render ---
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-0 font-sans">
            {/* Wide Mode Container */}
            <div className={`relative w-full h-full sm:h-[90vh] sm:aspect-video bg-[#0B1015] sm:rounded-2xl overflow-hidden shadow-2xl border-[1px] ${feedback?.type === 'CORRECT' ? 'border-green-500' : feedback?.type === 'WRONG' ? 'border-red-500' : 'border-slate-800'}`}>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-[60] w-12 h-12 flex items-center justify-center 
                               bg-black/30 backdrop-blur-md border border-white/10 rounded-full 
                               text-white/70 hover:bg-red-500/80 hover:text-white transition-all hover:scale-110"
                >
                    ✕
                </button>

                {/* 3D Scene */}
                <div className="absolute inset-0 z-0">
                    <ErrorBoundary>
                        <Canvas shadows dpr={[1, 1.5]}>
                            <Suspense fallback={null}>
                                <Runner3DScene
                                    activeQuestion={activeQuestion}
                                    spawnSignal={spawnSignal}
                                    onWallHit={handleWallHit}
                                    playerLane={playerLane}
                                    gameSpeed={gameSpeed}
                                    isQuizActive={gameState === 'QUESTION_GATE'}
                                />
                            </Suspense>
                        </Canvas>
                    </ErrorBoundary>
                </div>

                {/* HUD: Top Bar */}
                <div className="absolute top-0 left-0 w-full p-4 sm:p-6 flex justify-between items-start z-10 pointer-events-none bg-gradient-to-b from-black/60 to-transparent h-32">
                    <div className="flex gap-1.5">
                        {Array.from({ length: GAME_CONFIG.MAX_HEARTS }).map((_, i) => (
                            <div key={i} className={`h-2 w-8 rounded-full transition-all duration-300 ${i < hearts ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]' : 'bg-red-900/30'}`} />
                        ))}
                    </div>

                    <div className="flex flex-col items-end">
                        <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-widest bg-black/40 px-2 py-0.5 rounded uppercase backdrop-blur-sm">Score</span>
                        <div className="text-3xl sm:text-4xl font-black italic text-white tracking-tight drop-shadow-md">
                            {score.toString().padStart(5, '0')}
                        </div>
                    </div>
                </div>

                {/* QUESTION UI (Top Center, Glassmorphism) */}
                {gameState === 'QUESTION_GATE' && activeQuestion && (
                    <div className="absolute top-16 left-0 w-full flex justify-center px-4 z-20 pointer-events-none">
                        <div className="w-full max-w-4xl bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 animate-in slide-in-from-top-4 duration-500 shadow-2xl">

                            {/* Question Text */}
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center leading-snug mb-6 drop-shadow-sm">
                                {activeQuestion.question}
                            </h3>

                            {/* Answer Mapping Grid (A B C D) */}
                            <div className="grid grid-cols-4 gap-2 sm:gap-4">
                                {activeQuestion.choices.map((choice, i) => (
                                    <div key={i} className={`flex flex-col relative group transition-all duration-300 ${playerLane === i ? 'scale-105' : 'opacity-80'}`}>
                                        {/* Lane Indicator */}
                                        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded text-[10px] font-black tracking-widest uppercase
                                            ${playerLane === i ? 'bg-white text-black' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>
                                            {['A', 'B', 'C', 'D'][i]}
                                        </div>

                                        {/* Card */}
                                        <div className={`h-full flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-colors min-h-[80px]
                                            ${playerLane === i
                                                ? 'bg-gradient-to-b from-cyan-500/20 to-cyan-900/20 border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                                                : 'bg-slate-800/40 border-white/5'}`}>
                                            <span className={`text-xs sm:text-sm font-semibold leading-tight ${playerLane === i ? 'text-cyan-50' : 'text-slate-300'}`}>
                                                {choice}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Feedback Overlay */}
                {feedback && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                        <div className="flex flex-col items-center animate-in zoom-in spin-in-1 duration-300">
                            <div className={`text-6xl sm:text-8xl font-black italic tracking-tighter drop-shadow-2xl mb-2 
                                ${feedback.type === 'CORRECT' ? 'text-green-400' : 'text-red-500'}`}>
                                {feedback.type === 'CORRECT' ? 'PERFECT!' : 'MISS!'}
                            </div>
                            {feedback.type === 'CORRECT' && (
                                <div className="text-2xl font-mono font-bold text-white bg-green-500/20 px-4 py-1 rounded backdrop-blur border border-green-500/30">
                                    +{feedback.score} PTS
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Controls / Info Footer */}
                <div className="absolute bottom-4 left-0 w-full text-center pointer-events-none z-10 opacity-60">
                    <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-[0.2em]">
                        Use <span className="text-white font-bold mx-1">[ ← / → ]</span> to Select • Speed Increases during Questions
                    </p>
                </div>

                {/* Game Over Screen */}
                {gameState === 'GAMEOVER' && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-500">
                        <div className="text-center">
                            <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-2">FINISHED</h2>
                            <p className="text-slate-500 font-mono text-sm tracking-widest mb-8">SESSION TERMINATED</p>

                            <div className="text-8xl font-black text-white mb-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                {score}
                            </div>

                            <button
                                onClick={handleRestart}
                                className="px-10 py-4 bg-white text-black font-bold tracking-widest hover:bg-cyan-400 transition-colors uppercase"
                            >
                                Play Again
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
