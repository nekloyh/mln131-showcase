import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Text, Float, Outlines } from '@react-three/drei';
import * as THREE from 'three';
import { GAME_CONFIG } from '../gameConfig';

// --- Constants & Config (from centralized config) ---
const LANE_WIDTH = GAME_CONFIG.VISUAL.LANE_WIDTH;
const LANES = GAME_CONFIG.VISUAL.LANES;
const SEGMENT_LENGTH = GAME_CONFIG.VISUAL.SEGMENT_LENGTH;
const VIEW_DISTANCE = GAME_CONFIG.VISUAL.VIEW_DISTANCE;
const BASE_SPEED = GAME_CONFIG.WALL.BASE_SPEED;

// Neobrutal Palette
const COLORS = {
    BG: '#FAF7F0',            // Paper White
    GROUND: '#FFFFFF',        // Pure White
    GROUND_LINES: '#000000',  // Black Lines
    WALL_BASE: '#4D9DE0',     // Blue Wall
    WALL_STRIPES: '#000000',  // Black Stripes
    PLAYER: '#FF4D6D',        // Pink
    OBSTACLE: '#FFD400',      // Yellow
    TEXT: '#000000',
    OUTLINE: '#000000',
};

// --- Components ---

// Chibi Player: Simple Capsule + Head Block with Outline
function Player({ laneIndex }) {
    const group = useRef();
    const body = useRef();
    const [currentX, setCurrentX] = useState(LANES[1]);

    useFrame((state, delta) => {
        if (!group.current) return;

        // Lane Lerp
        const targetX = LANES[laneIndex] !== undefined ? LANES[laneIndex] : LANES[1];

        // Snappier movement
        setCurrentX(prev => THREE.MathUtils.lerp(prev, targetX, 15 * delta));

        group.current.position.x = currentX;
        group.current.position.y = 0; // Ground level

        // Procedural Animation: Squash & Stretch
        const time = state.clock.elapsedTime;
        const bounce = Math.abs(Math.sin(time * 15)); // Fast feet

        if (body.current) {
            // Bounce up/down
            body.current.position.y = 1.5 + bounce * 0.5;
            // Squash when landing
            const scaleY = 1 + (bounce * 0.1);
            const scaleXZ = 1 - (bounce * 0.05);
            body.current.scale.set(scaleXZ, scaleY, scaleXZ);

            // Tilt forward slightly when running
            body.current.rotation.x = 0.2;
            // Tilt sideways when moving lanes
            const tilt = (targetX - currentX) * -0.1;
            body.current.rotation.z = THREE.MathUtils.lerp(body.current.rotation.z, tilt, 10 * delta);
        }
    });

    return (
        <group ref={group} position={[0, 0, 4]}>
            <group ref={body}>
                {/* Body Block */}
                <mesh castShadow receiveShadow position={[0, 0, 0]}>
                    <capsuleGeometry args={[0.8, 1.2, 4, 8]} />
                    <meshStandardMaterial color={COLORS.PLAYER} toneMapped={false} />
                    <Outlines thickness={0.05} color="black" />
                </mesh>

                {/* Head / Visor (Simple Geometric) */}
                <mesh position={[0, 0.8, 0.5]}>
                    <boxGeometry args={[1.0, 0.4, 0.4]} />
                    <meshBasicMaterial color="black" />
                </mesh>
            </group>

            {/* Shadow Blob */}
            <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[1, 32]} />
                <meshBasicMaterial color="black" opacity={0.3} transparent />
            </mesh>
        </group>
    );
}

// Answer Wall: Blocky, Solid Colors, Black Borders
// Now supports wallBoost prop for early answer acceleration
const AnswerWall = React.memo(({ id, startZ, speed, wallBoost = 1, onCollide, onDespawn, playerLane }) => {
    const ref = useRef();
    const hasHit = useRef(false);
    // Use ref to always have fresh playerLane value in animation callback
    const playerLaneRef = useRef(playerLane);

    // Update ref whenever playerLane prop changes
    useEffect(() => {
        playerLaneRef.current = playerLane;
    }, [playerLane]);

    useFrame((state, delta) => {
        if (!ref.current) return;

        // Move - apply wallBoost multiplier for early answer acceleration
        const effectiveSpeed = speed * wallBoost;
        ref.current.position.z += effectiveSpeed * delta;
        const currentZ = ref.current.position.z;

        // Collision Check (Player at Z=PLAYER_Z from config)
        if (!hasHit.current) {
            if (Math.abs(currentZ - GAME_CONFIG.WALL.PLAYER_Z) < GAME_CONFIG.WALL.COLLISION_THRESHOLD) {
                hasHit.current = true;
                // Use ref to get current playerLane value, not stale closure value
                onCollide(id, playerLaneRef.current);
            }
        }

        // Despawn
        if (currentZ > GAME_CONFIG.WALL.DESPAWN_Z) {
            onDespawn(id);
        }
    });

    return (
        <group ref={ref} position={[0, 0, startZ]}>
            {/* Top Bar Label */}
            <mesh position={[0, 7, 0]}>
                <boxGeometry args={[34, 1.5, 1]} />
                <meshStandardMaterial color="black" />
            </mesh>

            {/* Lane Gates */}
            {LANES.map((laneX, i) => (
                <group key={i} position={[laneX, 3, 0]}>
                    {/* The Gate Block - Widened for new lanes */}
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[7, 6, 1.5]} /> {/* Thicker block */}
                        <meshStandardMaterial color={COLORS.BG} />
                        <Outlines thickness={0.15} color="black" />
                    </mesh>

                    {/* Option Text - BIGGER and BOLDER */}
                    <Text
                        position={[0, 0, 0.9]} // Pushed out slightly
                        fontSize={4.5} // Bigger Font
                        color="black"
                        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                        anchorX="center"
                        anchorY="middle"
                        outlineWidth={0.1}
                        outlineColor="white"
                    >
                        {['A', 'B', 'C', 'D'][i]}
                    </Text>
                </group>
            ))}
        </group>
    );
});

// Neobrutal Environment
function NeobrutalEnvironment({ speed }) {
    // Procedural Road Texture (Dashed Lines + Curbs)
    const roadTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 1024;
        // ... (content matches exactly, just removing floorRef)

        canvas.height = 1024;
        const ctx = canvas.getContext('2d');

        // 1. Base Ground
        ctx.fillStyle = COLORS.GROUND; // White
        ctx.fillRect(0, 0, 1024, 1024);

        // 2. Center Lane Markers (3 lines for 4 lanes)
        // Lanes are roughly split into 4 quarters. 
        // 25%, 50%, 75% width.
        ctx.fillStyle = '#1a1a1a'; // Dark Grey for contrast, not pure black

        const drawDashedLine = (x) => {
            const dashHeight = 120;
            const gapHeight = 100;
            for (let y = 0; y < 1024; y += (dashHeight + gapHeight)) {
                ctx.fillRect(x - 6, y, 12, dashHeight); // 12px wide dash
            }
        };

        drawDashedLine(256); // 25%
        drawDashedLine(512); // 50%
        drawDashedLine(768); // 75%

        // 3. Side Curbs (Warning Stripes)
        // Left Curb
        ctx.fillStyle = COLORS.WALL_BASE; // Blue accent
        ctx.fillRect(0, 0, 64, 1024);
        ctx.fillStyle = 'black';
        ctx.fillRect(64, 0, 8, 1024); // Inner border

        // Right Curb
        ctx.fillStyle = COLORS.WALL_BASE;
        ctx.fillRect(1024 - 64, 0, 64, 1024);
        ctx.fillStyle = 'black';
        ctx.fillRect(1024 - 72, 0, 8, 1024); // Inner border

        const tex = new THREE.CanvasTexture(canvas);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        // Anisotropy helps dashed lines look sharp at distance
        tex.anisotropy = 16;
        return tex;
    }, []);

    useFrame((state, delta) => {
        // Scroll texture logic
        // scale of speed needs to be adjusted for texture UV (0-1)
        // speed ~30 units/sec. Segment length ~100? 
        // Let's just scroll based on arbitrary visual feel.
        if (roadTexture) {
            // Negative Y moves "forward" visually on a floor plane mapped this way usually
            roadTexture.offset.y -= (speed * delta) * 0.05;
        }
    });

    return (
        <group>
            {/* The Road Plane */}
            {/* Width: 24 units (covers -12 to 12). Height: 400 (depth) */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, -50]} receiveShadow>
                {/* 
                  Plane args: [width, height, widthSegments, heightSegments] 
                  Using 32 width covers our 4 lanes (-6, -2, 0, 2, 6) broadly 
                */}
                <planeGeometry args={[32, 400]} />
                <meshStandardMaterial
                    map={roadTexture}
                    roughness={0.8}
                    metalness={0.1}
                />
            </mesh>

            {/* Distant Decoration / Walls (Simplified for new road look) */}
            {[-1, 1].map(side => (
                <mesh key={side} position={[side * 28, 10, -50]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[20, 40, 400]} />
                    <meshStandardMaterial color={COLORS.BG} />
                    {/* Just simple big blocks to frame the fog */}
                    <Outlines thickness={0.1} color="black" />
                </mesh>
            ))}
        </group>
    );
}

export default function Runner3DScene({ activeQuestion, onWallHit, playerLane, gameSpeed = 1, wallBoost = 1, spawnSignal }) {
    const [walls, setWalls] = useState([]);
    const lastSpawnedQuestionRef = useRef(null);

    useEffect(() => {
        // Check if we have a new spawn signal and a valid question
        // Also ensure we don't spawn duplicate walls for the same question
        if (spawnSignal && activeQuestion && activeQuestion.id !== lastSpawnedQuestionRef.current) {
            const id = Date.now();
            lastSpawnedQuestionRef.current = activeQuestion.id;
            console.log('[Runner3DScene] Spawning wall for question:', activeQuestion.id);
            setWalls(prev => [
                ...prev,
                { id, startZ: GAME_CONFIG.WALL.SPAWN_Z, question: activeQuestion }
            ]);
        }
    }, [spawnSignal, activeQuestion]);

    const handleDespawn = (id) => {
        setWalls(prev => prev.filter(w => w.id !== id));
    };

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 12, 22]} fov={50} rotation={[-0.4, 0, 0]} />

            {/* Flat Lighting for Neobrutal check */}
            <ambientLight intensity={1.2} />
            <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />
            <color attach="background" args={[COLORS.BG]} />
            <fog attach="fog" args={[COLORS.BG, 100, 290]} />

            <NeobrutalEnvironment speed={BASE_SPEED * gameSpeed} />

            <Player laneIndex={playerLane} />

            {walls.map(wall => (
                <AnswerWall
                    key={wall.id}
                    id={wall.id}
                    startZ={wall.startZ}
                    speed={BASE_SPEED * gameSpeed}
                    wallBoost={wallBoost}
                    onCollide={onWallHit}
                    onDespawn={handleDespawn}
                    playerLane={playerLane}
                />
            ))}
        </>
    );
}
