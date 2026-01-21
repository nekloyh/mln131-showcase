import React from 'react';

// --- Theme Config ---
const THEME = {
    colors: {
        black: '#000000',
        paper: '#FAF7F0',  // Cream
        primary: '#FF4D6D', // Pink Red
        secondary: '#4D9DE0', // Blue
        accent: '#FFD400', // Yellow
        success: '#00C853',
        danger: '#FF3B30',
        white: '#FFFFFF',
    },
    border: '3px solid #000000',
    shadow: '6px 6px 0px #000000',
    shadowSmall: '3px 3px 0px #000000',
    radius: '0px', // Neobrutal preference, but can be 8px if needed
};

// --- Components ---

/**
 * NeoFrame: The main container for the game canvas.
 * Renders a "Window" looking frame.
 */
export const NeoFrame = ({ children, title = "RUNNER QUIZ", className = "" }) => {
    return (
        <div className={`relative bg-[#FAF7F0] border-[4px] border-black shadow-[12px_12px_0px_#000] p-0 flex flex-col ${className}`}>
            {/* Window Header */}
            <div className="h-10 border-b-[4px] border-black bg-[#FFD400] flex items-center justify-between px-4 sticky top-0 z-10 shrink-0">
                <div className="font-black text-sm tracking-tighter uppercase flex items-center gap-2">
                    <div className="w-3 h-3 bg-black rounded-full animate-pulse" />
                    {title}
                </div>
                <div className="flex gap-2">
                    <div className="w-4 h-4 border-2 border-black bg-white" />
                    <div className="w-4 h-4 border-2 border-black bg-black" />
                </div>
            </div>

            {/* Content Area */}
            <div className="relative flex-1 flex flex-row overflow-hidden">
                {children}
            </div>
        </div>
    );
};

/**
 * NeoCard: A generic content container.
 */
export const NeoCard = ({ children, className = "", color = "bg-white" }) => {
    return (
        <div className={`${color} border-[3px] border-black shadow-[6px_6px_0px_#000] p-4 ${className}`}>
            {children}
        </div>
    );
};

/**
 * NeoButton: Highly interactive button.
 */
export const NeoButton = ({ onClick, children, variant = 'primary', className = "", disabled = false }) => {
    let bg = 'bg-[#FF4D6D] text-white'; // Primary
    if (variant === 'secondary') bg = 'bg-[#4D9DE0] text-white';
    if (variant === 'accent') bg = 'bg-[#FFD400] text-black';
    if (variant === 'neutral') bg = 'bg-white text-black';
    if (variant === 'success') bg = 'bg-[#00C853] text-white';
    if (variant === 'danger') bg = 'bg-[#FF3B30] text-white';

    if (disabled) bg = 'bg-gray-300 text-gray-500 cursor-not-allowed';

    return (
        <button
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            className={`
                ${bg} border-[3px] border-black 
                font-bold uppercase tracking-widest
                px-6 py-3
                ${disabled ? '' : 'shadow-[4px_4px_0px_#000] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]'}
                transition-all
                ${className}
            `}
        >
            {children}
        </button>
    );
};

/**
 * NeoPill: Use for Score or status tags.
 */
export const NeoPill = ({ label, value, color = "bg-[#FFD400]" }) => {
    return (
        <div className={`flex items-center border-[3px] border-black shadow-[3px_3px_0px_#000] ${color}`}>
            <div className="px-2 py-1 border-r-[3px] border-black font-black text-xs uppercase bg-white text-black">
                {label}
            </div>
            <div className="px-3 py-1 font-mono font-bold text-lg text-black">
                {value}
            </div>
        </div>
    );
};

/**
 * NeoHeart: Heart icon block.
 */
export const NeoHeart = ({ active }) => {
    return (
        <div className={`
            w-8 h-8 flex items-center justify-center border-[3px] border-black shadow-[2px_2px_0px_#000] transition-all
            ${active ? 'bg-[#FF4D6D] translate-y-0' : 'bg-gray-300 translate-y-1 opacity-50'}
        `}>
            {/* Simple geometric heart or icon */}
            <div className={`w-3 h-3 rotate-45 ${active ? 'bg-white' : 'bg-gray-500'}`} />
        </div>
    );
};

/**
 * NeoProgressBar: Thick, flat progress bar.
 */
export const NeoProgressBar = ({ progress = 1.0, color = "bg-[#FFD400]" }) => {
    return (
        <div className="w-full h-6 border-[3px] border-black bg-white relative">
            <div
                className={`h-full border-r-[3px] border-black ${color}`}
                style={{ width: `${Math.max(0, Math.min(100, progress * 100))}%`, transition: 'width 0.1s linear' }}
            />
        </div>
    );
};
