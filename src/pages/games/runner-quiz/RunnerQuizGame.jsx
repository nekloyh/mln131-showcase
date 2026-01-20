import React from 'react';
import RunnerQuiz3D from './three/RunnerQuiz3DWrapper';

/**
 * Main Entry Point for Runner Quiz Game
 * Switched to 3D Version (Temple Run Style)
 */
const RunnerQuizGame = ({ onClose }) => {
    return (
        <RunnerQuiz3D onClose={onClose} />
    );
};

export default RunnerQuizGame;
