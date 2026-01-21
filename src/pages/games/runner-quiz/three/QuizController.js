/**
 * QuizController.js
 * 
 * Single Source of Truth for Quiz Lifecycle.
 * - Manages the "One Quiz at a Time" rule.
 * - Handles the internal timer to prevent "old timer running" bugs.
 * - Dispatching events via callbacks to the React UI / Phaser Scene.
 */

class QuizController {
    constructor() {
        this.resetInternalState();
    }

    resetInternalState() {
        this.isOpen = false;
        this.activeQuestion = null;
        this.timeLeft = 0;
        this.timeLimit = 0;

        // Timer handles
        this.timerInterval = null;
        this.timerStartTimestamp = 0;

        // Callbacks
        this.onTick = null;       // (timeLeft, progress) => void
        this.onTimeOut = null;    // () => void
        this.onStateChange = null;// (state) => void
    }

    /**
     * Open a new quiz session.
     * Safely closes any existing session first.
     */
    open(question, timeLimitMs, callbacks = {}) {
        // Enforce: Always close previous if open
        if (this.isOpen) {
            console.warn('[QuizController] Force closing previous quiz to open new one.');
            this.close();
        }

        this.resetInternalState(); // Clear old state

        this.isOpen = true;
        this.activeQuestion = question;
        this.timeLimit = timeLimitMs;
        this.timeLeft = timeLimitMs;

        // Bind callbacks
        this.onTick = callbacks.onTick || null;
        this.onTimeOut = callbacks.onTimeOut || null;
        this.onStateChange = callbacks.onStateChange || null;

        this._startTimer();

        console.log(`[QuizController] OPEN id=${question.id || 'unknown'}`);
        if (this.onStateChange) this.onStateChange({ isOpen: true, question });
    }

    /**
     * Close the current quiz session.
     * Clears timers and listeners immediately.
     */
    close(reason = 'manual') {
        if (!this.isOpen) return;

        this._stopTimer();
        this.isOpen = false;
        this.activeQuestion = null;

        console.log(`[QuizController] CLOSE reason=${reason}`);

        if (this.onStateChange) this.onStateChange({ isOpen: false });

        // Remove references to callbacks to prevent leaks
        this.onTick = null;
        this.onTimeOut = null;
        this.onStateChange = null;
    }

    /**
     * Total cleanup when Scene shuts down.
     */
    destroy() {
        this.close('destroy');
        this.resetInternalState();
    }

    /**
     * Reset UI / Internal state specifically.
     * Alias for logic reuse.
     */
    resetQuizUI() {
        this.resetInternalState();
    }

    // --- Internal Timer Logic ---

    _startTimer() {
        this._stopTimer(); // Safety check

        this.timerStartTimestamp = Date.now();

        // Use setInterval for simplicity in this tick-based updating
        // (Could use requestAnimationFrame for smoother UI, but 100ms precision is fine for logic)
        this.timerInterval = setInterval(() => {
            const now = Date.now();
            const elapsed = now - this.timerStartTimestamp;
            const remaining = Math.max(0, this.timeLimit - elapsed);

            this.timeLeft = remaining;

            // Notify UI
            if (this.onTick) {
                // Progress = remaining percentage (1.0 = full time, 0.0 = no time left)
                const progress = remaining / this.timeLimit;
                this.onTick(remaining, progress);
            }

            // Check Timeout
            if (this.timeLeft <= 0) {
                this._handleTimeout();
            }

        }, 100); // 10 tick per second
    }

    _stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    _handleTimeout() {
        this._stopTimer();
        console.log('[QuizController] TIMEOUT');
        if (this.onTimeOut) this.onTimeOut();
        // Note: Controller doesn't close itself automatically on timeout 
        // because the UI might want to show "Time's Up" animation first.
        // It's the consumer's job to call close() when ready.
    }

    /**
     * Helper to check answer
     */
    checkAnswer(answerIndex) {
        if (!this.isOpen || !this.activeQuestion) return null;

        const isCorrect = this.activeQuestion.answerIndex === answerIndex;
        // Optionally logic to calculate score based on timeLeft could go here

        return {
            isCorrect,
            timeLeft: this.timeLeft
        };
    }
}

// Export as Singleton
export const quizController = new QuizController();
