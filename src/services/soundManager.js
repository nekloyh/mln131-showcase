/**
 * Sound Manager for Runner Quiz Game
 * 
 * Simple HTML5 Audio manager with preloading, volume control, and mute functionality.
 * Uses Web Audio API for better performance and control.
 */

// Sound file paths (relative to public folder)
const SOUND_FILES = {
    correct: '/sounds/correct.mp3',
    wrong: '/sounds/wrong.mp3',
    gameover: '/sounds/gameover.mp3',
    victory: '/sounds/victory.mp3',
    click: '/sounds/click.mp3',
    slide: '/sounds/slide.mp3',
};

class SoundManager {
    constructor() {
        this.sounds = {};
        this.muted = false;
        this.volume = 0.5; // Default volume 50%
        this.initialized = false;
        
        // Load mute preference from localStorage
        const savedMute = localStorage.getItem('runnerQuiz_muted');
        if (savedMute !== null) {
            this.muted = savedMute === 'true';
        }
        
        const savedVolume = localStorage.getItem('runnerQuiz_volume');
        if (savedVolume !== null) {
            this.volume = parseFloat(savedVolume);
        }
    }

    /**
     * Initialize and preload all sounds
     * Should be called after first user interaction (click/tap)
     */
    init() {
        if (this.initialized) return;

        Object.entries(SOUND_FILES).forEach(([name, path]) => {
            const audio = new Audio(path);
            audio.preload = 'auto';
            audio.volume = this.volume;
            
            // Preload the audio
            audio.load();
            
            this.sounds[name] = audio;
        });

        this.initialized = true;
    }

    /**
     * Play a sound by name
     * @param {string} name - Sound name (correct, wrong, gameover, victory, click)
     */
    play(name) {
        if (this.muted || !this.initialized) return;

        const sound = this.sounds[name];
        if (!sound) {
            console.warn(`[SoundManager] Sound "${name}" not found`);
            return;
        }

        // Clone the audio to allow overlapping sounds
        const clone = sound.cloneNode();
        clone.volume = this.volume;
        
        // Play and handle errors silently
        clone.play().catch(() => {
            // Ignore autoplay errors - they happen when user hasn't interacted yet
        });
    }

    /**
     * Toggle mute state
     * @returns {boolean} - New mute state
     */
    toggleMute() {
        this.muted = !this.muted;
        localStorage.setItem('runnerQuiz_muted', this.muted.toString());
        return this.muted;
    }

    /**
     * Set mute state
     * @param {boolean} muted 
     */
    setMuted(muted) {
        this.muted = muted;
        localStorage.setItem('runnerQuiz_muted', this.muted.toString());
    }

    /**
     * Get current mute state
     * @returns {boolean}
     */
    isMuted() {
        return this.muted;
    }

    /**
     * Set volume (0.0 to 1.0)
     * @param {number} volume 
     */
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
        localStorage.setItem('runnerQuiz_volume', this.volume.toString());
        
        // Update all preloaded sounds
        Object.values(this.sounds).forEach(sound => {
            sound.volume = this.volume;
        });
    }

    /**
     * Get current volume
     * @returns {number}
     */
    getVolume() {
        return this.volume;
    }
}

// Export singleton instance
export const soundManager = new SoundManager();

// Export sound names for type safety
export const SOUNDS = {
    CORRECT: 'correct',
    WRONG: 'wrong',
    GAMEOVER: 'gameover',
    VICTORY: 'victory',
    CLICK: 'click',
    SLIDE: 'slide',
};
