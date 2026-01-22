/**
 * Game Configuration for Runner Quiz
 * 
 * Centralized config file for all game timings, speeds, and scoring.
 * Import this config in all game-related files to maintain consistency.
 */

export const GAME_CONFIG = {
    // === LIVES / HEARTS ===
    MAX_HEARTS: 3,

    // === TIMING CONFIG ===
    TIMING: {
        // Time to answer a question (in milliseconds)
        QUESTION_TIME_LIMIT: 20000,  // 20 seconds per question
        
        // Minimum time limit (when difficulty increases)
        MIN_TIME_LIMIT: 8000,        // 8 seconds minimum
        
        // Time between questions (in milliseconds)
        QUESTION_INTERVAL: 5000,     // 5 seconds between questions
        
        // Delay before first question appears (let player get ready)
        FIRST_QUESTION_DELAY: 2000,  // 2 seconds
        
        // Feedback display duration (after answering)
        FEEDBACK_DURATION: 1200,     // 1.2 seconds
        
        // Time to transition back to normal state after feedback
        RESOLVE_TRANSITION: 300,     // 0.3 seconds
    },

    // === SPEED CONFIG ===
    SPEED: {
        // Normal running speed multiplier
        NORMAL: 1.0,
        
        // Speed during question phase (slightly faster for excitement)
        QUESTION_ACTIVE: 1.2,
        
        // Speed after correct answer (brief acceleration)
        AFTER_CORRECT: 1.5,
        
        // Speed during feedback/slow-mo
        SLOW_MO: 0.5,
        
        // WALL ACCELERATION: When player answers early, wall speeds up
        WALL_BOOST_MULTIPLIER: 4.0,  // Wall moves 4x faster to reach player quickly
        
        // Difficulty scaling per correct answer
        DIFFICULTY_SCALING: 0.05,    // 5% faster per correct answer
    },

    // === WALL CONFIG ===
    WALL: {
        // Starting Z position for spawned walls
        SPAWN_Z: -150,
        
        // Player position (Z coordinate)
        PLAYER_Z: 4,
        
        // Collision detection threshold
        COLLISION_THRESHOLD: 1.5,
        
        // Despawn position (behind player)
        DESPAWN_Z: 20,
        
        // Base speed of wall movement
        BASE_SPEED: 30,
    },

    // === SCORING CONFIG ===
    SCORING: {
        // Score range for correct answers
        MIN_SCORE: 200,              // Minimum score (answered at last moment)
        MAX_SCORE: 500,              // Maximum score (answered instantly)
        
        // Wrong answer score
        WRONG_SCORE: 0,
        
        // Timeout score
        TIMEOUT_SCORE: 0,
        
        /**
         * Calculate score based on time remaining
         * @param {number} timeLeft - Remaining time in milliseconds
         * @param {number} timeLimit - Total time limit in milliseconds
         * @returns {number} - Score between MIN_SCORE and MAX_SCORE
         */
        calculateScore: (timeLeft, timeLimit) => {
            if (timeLeft <= 0) return GAME_CONFIG.SCORING.MIN_SCORE;
            
            // Progress: 0 = no time left, 1 = full time
            const progress = Math.min(1, Math.max(0, timeLeft / timeLimit));
            
            // Linear interpolation from MIN to MAX based on remaining time
            const range = GAME_CONFIG.SCORING.MAX_SCORE - GAME_CONFIG.SCORING.MIN_SCORE;
            const score = Math.round(GAME_CONFIG.SCORING.MIN_SCORE + (range * progress));
            
            return score;
        },
    },

    // === VISUAL CONFIG ===
    VISUAL: {
        // Lane positions (X coordinates)
        LANES: [-12, -4, 4, 12],
        LANE_WIDTH: 8.0,
        
        // View distance for fog/rendering
        VIEW_DISTANCE: 300,
        SEGMENT_LENGTH: 100,
    },

    // === DIFFICULTY PROGRESSION ===
    DIFFICULTY: {
        // How much to reduce time limit per correct answer (multiplier)
        TIME_REDUCTION_PER_CORRECT: 0.05,  // 5% reduction per correct answer
        
        // Maximum difficulty multiplier
        MAX_DIFFICULTY_MULTIPLIER: 2.0,    // Can get up to 2x harder
    },
};

export default GAME_CONFIG;
