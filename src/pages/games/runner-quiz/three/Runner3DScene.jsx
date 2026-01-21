import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Text, Float, Stars, Trail } from '@react-three/drei';
import * as THREE from 'three';

// --- Constants & Config ---
// 4 Lanes: -6 (A), -2 (B), 2 (C), 6 (D) - Wider spacing for clarity
const LANE_WIDTH = 4.0;
const LANES = [-6, -2, 2, 6];
const SEGMENT_LENGTH = 100;
const VIEW_DISTANCE = 300;
const BASE_SPEED = 30;

// Colors (Ice Canyon Premium)
const COLORS = {
    FOG: '#D4E4ED',           // Brighter, premium cold fog
    GROUND: '#EBF5FB',        // Clean ice
    GROUND_ACCENT: '#AED6F1', // Light blue accents
    CANYON_NEAR: '#85C1E9',   // Light ice blue
    CANYON_MID: '#3498DB',    // Stronger blue
    CANYON_FAR: '#21618C',    // Deep ocean blue
    OBSTACLE_FRAME: '#2E86C1',
    OBSTACLE_GLOW: '#5DADE2',
    LANE_DIVIDER: '#D6EAF8',
    PLAYER_BODY: '#2ECC71',   // Bright Green
    PLAYER_TRAIL: '#2ECC71',
};

// --- Components ---

// Player Component (No Jump, Tilt + Dash feel)
function Player({ laneIndex }) {
    const mesh = useRef();
    const [currentX, setCurrentX] = useState(LANES[1]);

    useFrame((state, delta) => {
        if (!mesh.current) return;

        // Lane Lerp
        const targetX = LANES[laneIndex] !== undefined ? LANES[laneIndex] : LANES[1];
        const diff = targetX - currentX;

        // Smoother, snappier movement
        setCurrentX(prev => THREE.MathUtils.lerp(prev, targetX, 10 * delta));

        mesh.current.position.x = currentX;
        mesh.current.position.y = 1; // Fixed on ground

        // Tilt (Banking)
        const tilt = (targetX - currentX) * -0.15;
        mesh.current.rotation.z = THREE.MathUtils.lerp(mesh.current.rotation.z, tilt, 10 * delta);

        // Forward "Speed" Bob
        mesh.current.position.z = 4 + Math.sin(state.clock.elapsedTime * 20) * 0.2;
    });

    return (
        <group ref={mesh} position={[0, 1, 4]}>
            <Float speed={5} rotationIntensity={0.2} floatIntensity={0.2}>
                <Trail width={1.5} length={6} color={COLORS.PLAYER_TRAIL} attenuation={(t) => t * t}>
                    {/* Sci-fi Runner Body */}
                    <mesh castShadow receiveShadow>
                        <boxGeometry args={[1.2, 1.2, 1.8]} />
                        <meshStandardMaterial color={COLORS.PLAYER_BODY} roughness={0.2} metalness={0.8} />
                    </mesh>
                </Trail>
                {/* Engine/Jetpack Glow */}
                <mesh position={[0, 0, -0.9]}>
                    <planeGeometry args={[0.8, 0.8]} />
                    <meshBasicMaterial color="#00FF00" transparent opacity={0.8} side={THREE.DoubleSide} />
                </mesh>
            </Float>
        </group>
    );
}

// Answer Wall (Hero Object - Spans 4 Lanes)
const AnswerWall = React.memo(({ id, startZ, speed, onCollide, onDespawn, playerLane, questionData }) => {
    const ref = useRef();
    const hasHit = useRef(false);
    const [spawnAnim, setSpawnAnim] = useState(0);

    useFrame((state, delta) => {
        if (!ref.current) return;

        // Spawn Animation (Slide Up)
        if (spawnAnim < 1) {
            setSpawnAnim(prev => Math.min(prev + delta * 2, 1));
            ref.current.position.y = THREE.MathUtils.lerp(-10, 0, spawnAnim);
        }

        // Move
        ref.current.position.z += speed * delta;
        const currentZ = ref.current.position.z;

        // Collision Check (Player at Z=4)
        if (!hasHit.current) {
            if (Math.abs(currentZ - 4) < 1.0) {
                hasHit.current = true;
                onCollide(id, playerLane);
            }
        }

        // Despawn
        if (currentZ > 20) {
            onDespawn(id);
        }
    });

    return (
        <group ref={ref} position={[0, -10, startZ]}>
            {/* Main Arch Structure */}
            <mesh position={[0, 6, 0]}>
                <boxGeometry args={[26, 1, 1]} /> {/* Top Bar */}
                <meshStandardMaterial color={COLORS.OBSTACLE_FRAME} metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Lane Panels */}
            {LANES.map((laneX, i) => (
                <group key={i} position={[laneX, 3, 0]}>
                    {/* Glass Panel */}
                    <mesh>
                        <boxGeometry args={[3.8, 5, 0.2]} />
                        <meshPhysicalMaterial
                            color={COLORS.OBSTACLE_GLOW}
                            transmission={0.6}
                            opacity={0.8}
                            transparent
                            roughness={0}
                            thickness={1}
                        />
                    </mesh>

                    {/* Border Glow */}
                    <mesh position={[0, 0, 0.05]}>
                        <ringGeometry args={[1.5, 1.6, 32]} />
                        <meshBasicMaterial color="white" />
                    </mesh>

                    {/* Option Label (World Space UI) */}
                    <Text
                        position={[0, 0, 0.2]}
                        fontSize={2.5}
                        color="white"
                        font="https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxM.woff" // Default font
                        anchorX="center"
                        anchorY="middle"
                        outlineWidth={0.05}
                        outlineColor={COLORS.CANYON_DARK}
                    >
                        {['A', 'B', 'C', 'D'][i]}
                    </Text>
                </group>
            ))}
        </group>
    );
});

// Environment with Parallax Layers
function CanyonEnvironment({ speed }) {
    const layer1 = useRef();
    const layer2 = useRef();
    const layer3 = useRef();

    useFrame((state, delta) => {
        // Parallax scrolling
        if (layer1.current) layer1.current.position.z = (layer1.current.position.z + speed * delta * 0.8) % 200;
        if (layer2.current) layer2.current.position.z = (layer2.current.position.z + speed * delta * 0.4) % 200;
        if (layer3.current) layer3.current.position.z = (layer3.current.position.z + speed * delta * 0.1) % 200;
    });

    const CanyonSide = ({ xOffset, color, scaleY }) => (
        <group>
            {[-1, 1].map(side => (
                <mesh key={side} position={[side * xOffset, 10, -100]} rotation={[0, 0, side * 0.1]} scale={[1, scaleY, 1]}>
                    <cylinderGeometry args={[10, 20, 400, 8]} />
                    <meshStandardMaterial color={color} flatShading />
                </mesh>
            ))}
        </group>
    );

    return (
        <group>
            {/* Near Layer */}
            <group ref={layer1}>
                {Array.from({ length: 5 }).map((_, i) => (
                    <group key={i} position={[0, 0, -i * 40]}>
                        <CanyonSide xOffset={35} color={COLORS.CANYON_NEAR} scaleY={1} />
                    </group>
                ))}
            </group>
            {/* Mid Layer */}
            <group ref={layer2}>
                {Array.from({ length: 5 }).map((_, i) => (
                    <group key={i} position={[0, 5, -i * 60]}>
                        <CanyonSide xOffset={50} color={COLORS.CANYON_MID} scaleY={2} />
                    </group>
                ))}
            </group>
            {/* Far Layer */}
            <group ref={layer3}>
                {Array.from({ length: 5 }).map((_, i) => (
                    <group key={i} position={[0, 10, -i * 100]}>
                        <CanyonSide xOffset={80} color={COLORS.CANYON_FAR} scaleY={5} />
                    </group>
                ))}
            </group>
        </group>
    );
}

function MovingTrack({ speed }) {
    const group = useRef();

    useFrame((state, delta) => {
        if (group.current) {
            group.current.position.z += speed * delta;
            if (group.current.position.z >= SEGMENT_LENGTH * 2) {
                group.current.position.z -= SEGMENT_LENGTH * 2;
            }
        }
    });

    return (
        <group ref={group}>
            {[0, 1, 2, 3].map(i => (
                <group key={i} position={[0, -0.1, -i * SEGMENT_LENGTH]}>
                    {/* Main Road */}
                    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                        <planeGeometry args={[30, SEGMENT_LENGTH]} />
                        <meshStandardMaterial color={COLORS.GROUND} roughness={0.1} metalness={0.1} />
                    </mesh>

                    {/* Lane Separators (Lines) */}
                    {[-4, 0, 4].map((x, idx) => (
                        <mesh key={idx} position={[x, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                            <planeGeometry args={[0.2, SEGMENT_LENGTH]} />
                            <meshBasicMaterial color={COLORS.LANE_DIVIDER} opacity={0.6} transparent />
                        </mesh>
                    ))}

                    {/* Edge Rails */}
                    {[-8, 8].map((x, idx) => (
                        <mesh key={idx} position={[x, 1, 0]}>
                            <boxGeometry args={[1, 2, SEGMENT_LENGTH]} />
                            <meshStandardMaterial color={COLORS.CANYON_NEAR} />
                        </mesh>
                    ))}
                </group>
            ))}
        </group>
    );
}

export default function Runner3DScene({ isQuizActive, activeQuestion, onWallHit, playerAction, playerLane, gameSpeed = 1, spawnSignal }) {
    const [walls, setWalls] = useState([]);

    useEffect(() => {
        if (spawnSignal && activeQuestion) {
            const id = Date.now();
            setWalls(prev => [
                ...prev,
                { id, startZ: -150, question: activeQuestion } // Spawn further away because of larger scale
            ]);
        }
    }, [spawnSignal, activeQuestion]);

    const handleDespawn = (id) => {
        setWalls(prev => prev.filter(w => w.id !== id));
    };

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 8, 16]} fov={50} rotation={[-0.2, 0, 0]} />

            <color attach="background" args={[COLORS.FOG]} />
            <fog attach="fog" args={[COLORS.FOG, 40, VIEW_DISTANCE]} />

            <ambientLight intensity={0.8} />
            <directionalLight position={[50, 50, 20]} intensity={1.5} castShadow shadow-mapSize={[2048, 2048]} />

            <Stars radius={200} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

            <CanyonEnvironment speed={BASE_SPEED * gameSpeed} />
            <MovingTrack speed={BASE_SPEED * gameSpeed} />

            {/* Note: playerAction is mostly for visual effects now, no jump */}
            <Player laneIndex={playerLane} />

            {walls.map(wall => (
                <AnswerWall
                    key={wall.id}
                    id={wall.id}
                    startZ={wall.startZ}
                    speed={BASE_SPEED * gameSpeed}
                    onCollide={onWallHit}
                    onDespawn={handleDespawn}
                    playerLane={playerLane}
                    questionData={wall.question}
                />
            ))}

            <Environment preset="city" blur={0.8} />
        </>
    );
}
