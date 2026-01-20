import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Runner3DScene from './Runner3DScene';
import questionsData from '../questions.json';
import ErrorBoundary from '../../../../components/ui/ErrorBoundary';

// --- Game Logic Config ---
const GAME_CONFIG = {
    MAX_HEARTS: 3,
    QUIZ_TIME_LIMIT: 10,
    BASE_SCORE: 100
};

export default function RunnerQuiz3D({ onClose }) {
    // --- State ---
    const [gameState, setGameState] = useState('RUNNING'); // RUNNING, QUIZ, GAMEOVER
    const [score, setScore] = useState(0);
    const [hearts, setHearts] = useState(GAME_CONFIG.MAX_HEARTS);

    // Quiz State
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [timeLeft, setTimeLeft] = useState(GAME_CONFIG.QUIZ_TIME_LIMIT);

    // Player State
    const [gameSpeed, setGameSpeed] = useState(1);
    const [playerAction, setPlayerAction] = useState('RUN');
    const [playerLane, setPlayerLane] = useState(1); // 0 (Left), 1 (Center), 2 (Right)

    // --- Input Handling ---
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (gameState !== 'RUNNING') return;

            switch (e.key) {
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    setPlayerLane(prev => Math.max(0, prev - 1));
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    setPlayerLane(prev => Math.min(2, prev + 1));
                    break;
                case 'ArrowUp':
                case ' ':
                case 'w':
                case 'W':
                    setPlayerAction('JUMP');
                    // Reset jump action after animation time (approx 0.6s)
                    setTimeout(() => setPlayerAction('RUN'), 600);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameState]);

    // --- Timers ---
    useEffect(() => {
        let timer;
        if (gameState === 'QUIZ' && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => Math.max(0, prev - 0.1));
            }, 100);
        } else if (gameState === 'QUIZ' && timeLeft <= 0) {
            handleAnswer(-1); // Timeout
        }
        return () => clearInterval(timer);
    }, [gameState, timeLeft]);

    // --- Callbacks ---

    const handleQuizTrigger = useCallback(() => {
        if (gameState === 'RUNNING') {
            const randomQ = questionsData[Math.floor(Math.random() * questionsData.length)];
            setCurrentQuestion(randomQ);
            setTimeLeft(GAME_CONFIG.QUIZ_TIME_LIMIT);
            setGameState('QUIZ');
        }
    }, [gameState]);

    const handleAnswer = (selectedIndex) => {
        // Prevent double answer if timed out + clicked
        if (!currentQuestion && selectedIndex !== -1) return;

        const isCorrect = currentQuestion && selectedIndex === currentQuestion.answerIndex;

        if (isCorrect) {
            setScore(prev => prev + GAME_CONFIG.BASE_SCORE + Math.floor(timeLeft * 10));
            setGameSpeed(prev => Math.min(prev + 0.1, 2.5));
            // Trigger Happy Jump
            setPlayerAction('JUMP');
        } else {
            setHearts(prev => {
                const newHearts = prev - 1;
                if (newHearts <= 0) {
                    setTimeout(() => setGameState('GAMEOVER'), 500);
                }
                return newHearts;
            });
        }

        // Resume if alive
        if (hearts > 1 || isCorrect) {
            setGameState('RUNNING');
            setTimeout(() => setPlayerAction('RUN'), 600);
        }
    };

    const handleRestart = () => {
        setScore(0);
        setHearts(GAME_CONFIG.MAX_HEARTS);
        setGameSpeed(1);
        setPlayerLane(1);
        setGameState('RUNNING');
        setPlayerAction('RUN');
    };

    // --- Render ---
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-0 sm:p-4">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-[60] w-10 h-10 flex items-center justify-center 
                           bg-white/10 backdrop-blur border border-white/20 rounded-full 
                           text-white hover:bg-red-500 hover:border-red-500 transition-colors"
            >
                ✕
            </button>

            {/* Game Container */}
            <div className="relative w-full h-full max-w-6xl max-h-[90vh] bg-[#18181B] rounded-xl overflow-hidden shadow-2xl border-4 border-[#27272A]">

                {/* 3D Scene Layer */}
                {/* 3D Scene Layer */}
                <div className="absolute inset-0 z-0">
                    <ErrorBoundary>
                        <Canvas shadows dpr={[1, 2]}>
                            <Suspense fallback={<group><mesh><boxGeometry args={[1, 1, 1]} /><meshStandardMaterial color="red" /></mesh></group>}>
                                <Runner3DScene
                                    isQuizActive={gameState === 'QUIZ'}
                                    onQuizTrigger={handleQuizTrigger}
                                    playerAction={playerAction}
                                    playerLane={playerLane}
                                    gameSpeed={gameSpeed}
                                />
                            </Suspense>
                        </Canvas>
                    </ErrorBoundary>
                </div>

                {/* HUD Layer */}
                <div className="absolute top-0 left-0 w-full p-6 flex justify-between z-10 pointer-events-none">
                    {/* Hearts */}
                    <div className="flex gap-2">
                        {Array.from({ length: GAME_CONFIG.MAX_HEARTS }).map((_, i) => (
                            <div key={i} className={`text-4xl filter drop-shadow-lg transition-transform ${i < hearts ? 'scale-100 opacity-100' : 'scale-75 opacity-20 grayscale'}`}>
                                ❤️
                            </div>
                        ))}
                    </div>

                    {/* Score */}
                    <div className="flex flex-col items-end">
                        <span className="text-sm font-bold text-zinc-400 tracking-widest uppercase">Score</span>
                        <div className="text-5xl font-black italic text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)]" style={{ fontFamily: 'Oswald, sans-serif' }}>
                            {score.toString().padStart(5, '0')}
                        </div>
                    </div>
                </div>

                {/* Controls Hint (Desktop) */}
                {gameState === 'RUNNING' && (
                    <div className="absolute bottom-8 left-0 w-full text-center pointer-events-none opacity-50 z-10">
                        <div className="text-white font-mono text-sm bg-black/40 inline-block px-4 py-2 rounded-lg backdrop-blur">
                            [←] LEFT  [→] RIGHT  [SPACE] JUMP
                        </div>
                    </div>
                )}

                {/* Quiz Overlay */}
                {gameState === 'QUIZ' && currentQuestion && (
                    <div className="absolute inset-x-0 bottom-0 top-[15%] flex flex-col justify-end items-center z-20 pb-12 px-4 pointer-events-none">
                        <div className="w-full max-w-2xl bg-[#18181B]/95 backdrop-blur-xl rounded-none border-2 border-[#E4E4E7] shadow-[8px_8px_0_#000000] p-8 pointer-events-auto animate-in slide-in-from-bottom-10 duration-200">

                            {/* Header */}
                            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                                <span className="text-[#FACC15] font-mono text-sm font-bold tracking-widest">
                                    /// SYSTEM_OVERRIDE_DETECTED
                                </span>
                                <span className="text-white font-mono text-xl font-bold">
                                    {Math.ceil(timeLeft)}s
                                </span>
                            </div>

                            {/* Question */}
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight font-sans">
                                {currentQuestion.question}
                            </h3>

                            {/* Answers */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {currentQuestion.choices.map((choice, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswer(index)}
                                        className="group relative h-16 bg-[#27272A] border border-white/20 hover:bg-white hover:border-white transition-all active:translate-y-1 active:shadow-none"
                                    >
                                        <div className="absolute inset-0 flex items-center px-4 gap-4">
                                            <div className="w-8 h-8 flex items-center justify-center bg-black/20 group-hover:bg-black text-white group-hover:text-white font-mono font-bold text-sm">
                                                {['A', 'B', 'C', 'D'][index]}
                                            </div>
                                            <span className="font-bold text-zinc-300 group-hover:text-black text-lg truncate">
                                                {choice}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Game Over Modal */}
                {gameState === 'GAMEOVER' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm z-50 animate-in fade-in zoom-in duration-200">
                        <div className="bg-[#FFFDF5] p-10 max-w-md w-full text-center shadow-[12px_12px_0_#EF4444] border-4 border-black">
                            <h2 className="text-6xl font-black mb-2 text-black font-sans tracking-tighter">CRASHED</h2>
                            <div className="h-2 w-full bg-black mb-8"></div>

                            <div className="mb-8">
                                <p className="text-zinc-500 font-mono text-sm mb-1">FINAL DISTANCE</p>
                                <p className="text-7xl font-black text-[#EF4444]">{score}</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={handleRestart}
                                    className="w-full py-4 bg-black text-white font-bold text-xl hover:bg-[#FACC15] hover:text-black border-2 border-transparent hover:border-black transition-all"
                                >
                                    REBOOT SYSTEM
                                </button>
                                <button
                                    onClick={onClose}
                                    className="w-full py-4 bg-transparent text-zinc-500 font-bold text-sm hover:text-black transition-colors"
                                >
                                    ABORT MISSION
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
