import { Suspense, useRef, useLayoutEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, ContactShadows } from "@react-three/drei";

function TrongDongModel({ autoRotate = true }) {
  const groupRef = useRef();
  const { scene } = useGLTF("/trong_dong/scene.gltf");
  
  useLayoutEffect(() => {
    if (groupRef.current) {
      // tilt slightly up and rotate to show more of the side
      groupRef.current.rotation.set(0.15, 0.6, 0);
    }
  }, []);
  
  useFrame((state, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive 
        object={scene} 
        scale={0.18}
        position={[0, -1.1, 0]}
      />
    </group>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#8B4513" wireframe />
    </mesh>
  );
}

export default function TrongDong3D({ className = "" }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [2, 1.6, 11], fov: 30 }}
        style={{ background: "transparent" }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={1.5}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={<LoadingFallback />}>
          <TrongDongModel />
          <ContactShadows
            position={[0, -2, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />
          <Environment preset="warehouse" />
        </Suspense>
        
        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          minDistance={6}
          maxDistance={20}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          autoRotate={false}
          target={[0, 0, 0]}
        />
      </Canvas>
      
      {/* Instruction overlay */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-ink/80 text-bone px-3 py-1.5 rounded-sm font-mono text-xs uppercase tracking-wider pointer-events-none select-none">
        Kéo để xoay • Cuộn để zoom
      </div>
    </div>
  );
}

// Preload model
useGLTF.preload("/trong_dong/scene.gltf");
