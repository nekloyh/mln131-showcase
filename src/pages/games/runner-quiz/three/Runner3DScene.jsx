import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Text } from '@react-three/drei';
import * as THREE from 'three';

// --- Constants & Config ---
const LANE_WIDTH = 3.5;
const LANES = [-LANE_WIDTH, 0, LANE_WIDTH]; // Left, Center, Right
const SEGMENT_LENGTH = 40;
const VIEW_DISTANCE = 160;
const BASE_SPEED = 20;

// Colors
const COLORS = {
    FOG: '#D4D4D8',
    GROUND: '#18181B',
    PLATFORM: '#F4F4F5',
    OBSTACLE: '#EF4444',
    OBSTACLE_OUTLINE: '#7F1D1D',
    PLAYER_BODY: '#FFFFFF',
    PLAYER_OUTLINE: '#000000',
    LANE_MARKER: '#E4E4E7',
};

// --- Components ---

// Player Component (Same as before but simplified)
function Player({ laneIndex, action }) {
    const mesh = useRef();
    const [currentX, setCurrentX] = useState(0);
    const jumpY = useRef(0);
    const jumpVel = useRef(0);
    const isJumping = useRef(false);

    useFrame((state, delta) => {
        if (!mesh.current) return;

        // Lane Lerp
        const targetX = LANES[laneIndex];
        const diff = targetX - currentX;
        if (Math.abs(diff) > 0.05) {
            setCurrentX(prev => prev + diff * 15 * delta);
        } else {
            setCurrentX(targetX);
        }

        // Jump
        if (action === 'JUMP' && !isJumping.current) {
            isJumping.current = true;
            jumpVel.current = 18;
        }

        if (isJumping.current) {
            jumpY.current += jumpVel.current * delta;
            jumpVel.current -= 60 * delta; // Gravity
            if (jumpY.current <= 0) {
                jumpY.current = 0;
                jumpVel.current = 0;
                isJumping.current = false;
            }
        }

        mesh.current.position.x = currentX;
        mesh.current.position.y = 1 + jumpY.current;

        // Tilt
        mesh.current.rotation.z = (targetX - currentX) * -0.15;
    });

    return (
        <group ref={mesh} position={[0, 1, 4]}>
            {/* Simple Mesh */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1, 2, 1]} />
                <meshStandardMaterial color={COLORS.PLAYER_BODY} roughness={0.1} />
            </mesh>
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[1.05, 2.05, 1.05]} />
                <meshBasicMaterial color="black" wireframe />
            </mesh>
            {/* Eyes */}
            <mesh position={[-0.2, 0.5, 0.52]}>
                <planeGeometry args={[0.2, 0.2]} />
                <meshBasicMaterial color="black" />
            </mesh>
            <mesh position={[0.2, 0.5, 0.52]}>
                <planeGeometry args={[0.2, 0.2]} />
                <meshBasicMaterial color="black" />
            </mesh>
        </group>
    );
}

// Obstacle that moves itself
// We use a callback to report collision to avoid React Renders
const SelfMovingObstacle = React.memo(({ id, laneIndex, startZ, speed, onCollide, onDespawn, isQuizActive, playerLane }) => {
    const ref = useRef();
    // Keep track of 'hit' locally to avoid multi-trigger
    const hasHit = useRef(false);

    useFrame((state, delta) => {
        if (!ref.current) return;

        // Move towards positive Z (towards player at Z=4)
        // If speed is 0 (Quiz Active), we stop moving?
        // Actually the World moves.
        // Wait, in previous logic "MovingWorld" moves TEXTURES.
        // Obstacles must move RELATIVE to player?
        // Let's stick to: Player is Static Z=4. World moves Z+. Obstacles move Z+.

        const currentSpeed = isQuizActive ? 0 : speed;
        ref.current.position.z += currentSpeed * delta;

        const currentZ = ref.current.position.z;

        // Collision Check (Player at Z=4)
        if (!isQuizActive && !hasHit.current) {
            if (Math.abs(currentZ - 4) < 1.0) { // Z overlap
                if (laneIndex === playerLane) {
                    hasHit.current = true;
                    onCollide();
                }
            }
        }

        // Despawn Check
        if (currentZ > 20) {
            onDespawn(id);
        }
    });

    const x = LANES[laneIndex];

    return (
        <group ref={ref} position={[x, 1.5, startZ]}>
            <mesh castShadow receiveShadow>
                <boxGeometry args={[2, 3, 2]} />
                <meshStandardMaterial color={COLORS.OBSTACLE} />
            </mesh>
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2.05, 3.05, 2.05]} />
                <meshBasicMaterial color={COLORS.OBSTACLE_OUTLINE} wireframe />
            </mesh>
            {/* Use simple Text, fallback if not loaded */}
            <Text
                position={[0, 0.5, 1.1]}
                fontSize={1.5}
                color="black"
                anchorX="center"
                anchorY="middle"
            >
                !
            </Text>
        </group>
    );
});

function MovingWorld({ speed }) {
    const group = useRef();
    useFrame((state, delta) => {
        if (group.current) {
            group.current.position.z += speed * delta;
            if (group.current.position.z >= SEGMENT_LENGTH) {
                group.current.position.z -= SEGMENT_LENGTH;
            }
        }
    });
    // Simplified World Mesh to avoid heavy re-renders
    return (
        <group ref={group}>
            {[-1, 0, 1, 2, 3, 4].map(i => (
                <group key={i} position={[0, -0.5, -i * SEGMENT_LENGTH]}>
                    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                        <planeGeometry args={[15, SEGMENT_LENGTH]} />
                        <meshStandardMaterial color={COLORS.PLATFORM} />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

export default function Runner3DScene({ isQuizActive, onQuizTrigger, playerAction, playerLane, gameSpeed = 1 }) {
    // We use a simpler "Spawn Manager" logic
    // We store obstacles in a state array only for mounting/unmounting
    const [obstacles, setObstacles] = useState([]);

    // We need a Ref to track last spawn time/position to avoid using state in loop
    const stateRef = useRef({
        lastSpawnTime: 0,
        nextId: 1
    });

    // Helper to remove obstacle from list
    const handleDespawn = (id) => {
        setObstacles(prev => prev.filter(o => o.id !== id));
    };

    useFrame((state, delta) => {
        if (isQuizActive) return;

        // Spawning Logic based on Time (approx every 1.5s / GameSpeed)
        stateRef.current.lastSpawnTime += delta;
        const spawnInterval = 1.5 / gameSpeed;

        if (stateRef.current.lastSpawnTime > spawnInterval) {
            stateRef.current.lastSpawnTime = 0;

            // Add new obstacle
            const id = stateRef.current.nextId++;
            const lane = Math.floor(Math.random() * 3);

            // We force a nice gap by spawning far away
            // Start Z = -100
            setObstacles(prev => [
                ...prev,
                { id, lane, startZ: -100 }
            ]);
        }
    });

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 5, 12]} fov={50} rotation={[-0.4, 0, 0]} />

            <color attach="background" args={[COLORS.FOG]} />
            <fog attach="fog" args={[COLORS.FOG, 20, VIEW_DISTANCE]} />

            <ambientLight intensity={1.5} />
            <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />

            <MovingWorld speed={isQuizActive ? 0 : BASE_SPEED * gameSpeed} />

            <Player laneIndex={playerLane} action={playerAction} />

            {obstacles.map(obs => (
                <SelfMovingObstacle
                    key={obs.id}
                    id={obs.id}
                    laneIndex={obs.lane}
                    startZ={obs.startZ}
                    speed={BASE_SPEED * gameSpeed}
                    onCollide={onQuizTrigger}
                    onDespawn={handleDespawn}
                    isQuizActive={isQuizActive}
                    playerLane={playerLane}
                />
            ))}

            {/* Fallback Environment using standard lights if 'city' fails, but 'city' is usually robust */}
            <Environment preset="city" />
        </>
    );
}
