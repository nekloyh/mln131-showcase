/**
 * Question Utilities for Runner Quiz
 * 
 * Functions for shuffling questions and their choices.
 */

/**
 * Fisher-Yates shuffle algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} - New shuffled array (does not mutate original)
 */
export function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Shuffle the choices of a question while updating the correct answerIndex
 * @param {Object} question - Question object with choices and answerIndex
 * @returns {Object} - New question object with shuffled choices and updated answerIndex
 */
export function shuffleQuestionChoices(question) {
    const { choices, answerIndex, ...rest } = question;
    
    // DEBUG: Log original answer
    console.log('[SHUFFLE DEBUG] Original answerIndex:', answerIndex);
    console.log('[SHUFFLE DEBUG] Original correct answer:', choices[answerIndex]);
    
    // Create array of { choice, isCorrect } to track correct answer
    const choicesWithFlag = choices.map((choice, index) => ({
        choice,
        isCorrect: index === answerIndex
    }));
    
    // Shuffle the choices
    const shuffledChoices = shuffleArray(choicesWithFlag);
    
    // Find new index of correct answer
    const newAnswerIndex = shuffledChoices.findIndex(c => c.isCorrect);
    
    // DEBUG: Log new answer
    console.log('[SHUFFLE DEBUG] New answerIndex:', newAnswerIndex);
    console.log('[SHUFFLE DEBUG] New correct answer:', shuffledChoices[newAnswerIndex].choice);
    
    return {
        ...rest,
        choices: shuffledChoices.map(c => c.choice),
        answerIndex: newAnswerIndex
    };
}

/**
 * Get a random question with shuffled choices
 * @param {Array} questions - Array of all questions
 * @param {Set} usedIds - Set of already used question IDs (optional)
 * @returns {Object} - { question: shuffled question, usedIds: updated set }
 */
export function getRandomQuestion(questions, usedIds = new Set()) {
    // Filter out already used questions
    let availableQuestions = questions.filter(q => !usedIds.has(q.id));
    
    // If all questions used, reset the pool
    if (availableQuestions.length === 0) {
        availableQuestions = questions;
        usedIds.clear();
    }
    
    // Pick random question
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];
    
    // Add to used set
    usedIds.add(selectedQuestion.id);
    
    // Shuffle choices and return
    return {
        question: shuffleQuestionChoices(selectedQuestion),
        usedIds
    };
}

/**
 * Prepare a shuffled question pool for the game session
 * @param {Array} questions - Array of all questions
 * @returns {Array} - Shuffled array of questions with shuffled choices
 */
export function prepareQuestionPool(questions) {
    // Shuffle question order
    const shuffledQuestions = shuffleArray(questions);
    
    // Shuffle choices for each question
    return shuffledQuestions.map(q => shuffleQuestionChoices(q));
}

/**
 * Question Pool Manager - manages question pool state for a game session
 */
export class QuestionPoolManager {
    constructor(questions) {
        this.originalQuestions = questions;
        this.reset();
    }
    
    /**
     * Reset the pool for a new game
     */
    reset() {
        this.pool = prepareQuestionPool(this.originalQuestions);
        this.currentIndex = 0;
        this.usedIds = new Set();
        this.answeredCount = 0;
    }
    
    /**
     * Get next question from the shuffled pool
     * When pool is exhausted, returns null (game complete)
     * @returns {Object|null} - Question with shuffled choices, or null if pool exhausted
     */
    getNext() {
        if (this.currentIndex >= this.pool.length) {
            return null; // Pool exhausted - game complete!
        }
        
        const question = this.pool[this.currentIndex];
        this.currentIndex++;
        
        return question;
    }
    
    /**
     * Get a random question (not sequential)
     * Tracks used questions to avoid repeats
     * @returns {Object|null} - Question with shuffled choices, or null if all used
     */
    getRandom() {
        // Check if all questions have been used
        if (this.usedIds.size >= this.originalQuestions.length) {
            return null; // All questions used - game complete!
        }
        
        const result = getRandomQuestion(this.originalQuestions, this.usedIds);
        this.usedIds = result.usedIds;
        return result.question;
    }
    
    /**
     * Mark a question as answered (for tracking progress)
     */
    markAnswered() {
        this.answeredCount++;
    }
    
    /**
     * Check if all questions have been answered
     */
    get isComplete() {
        return this.usedIds.size >= this.originalQuestions.length;
    }
    
    /**
     * Check if there are questions remaining
     */
    get hasRemaining() {
        return this.usedIds.size < this.originalQuestions.length;
    }
    
    /**
     * Get remaining questions count
     */
    get remaining() {
        return this.originalQuestions.length - this.usedIds.size;
    }
    
    /**
     * Get answered questions count
     */
    get answered() {
        return this.usedIds.size;
    }
    
    /**
     * Get total questions count
     */
    get total() {
        return this.originalQuestions.length;
    }
}
