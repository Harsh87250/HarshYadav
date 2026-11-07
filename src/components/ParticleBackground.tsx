import { useMemo, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particles({ count = 1400 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  const colors = useMemo(() => {
    const c1 = new THREE.Color('#4CA8FF');
    const c2 = new THREE.Color('#6CE6FF');
    const c3 = new THREE.Color('#8B7BFF');
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const pick = Math.random();
      const color = pick < 0.5 ? c1 : pick < 0.85 ? c2 : c3;
      arr[i * 3] = color.r;
      arr[i * 3 + 1] = color.g;
      arr[i * 3 + 2] = color.b;
    }
    return arr;
  }, [count]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.03 + mouseRef.current.x * 0.15;
    pointsRef.current.rotation.x = Math.sin(t * 0.08) * 0.06 + mouseRef.current.y * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.08 + mouseRef.current.x * 0.2;
    groupRef.current.rotation.x = mouseRef.current.y * 0.15;
    groupRef.current.children.forEach((child, i) => {
      child.position.y = Math.sin(t * 0.4 + i * 1.5) * 0.5;
      child.rotation.x = t * 0.3 + i;
      child.rotation.z = t * 0.2;
    });
  });

  return (
    <group ref={groupRef}>
      <mesh position={[3.5, 0, -2]}>
        <icosahedronGeometry args={[0.6, 0]} />
        <meshBasicMaterial color="#4CA8FF" wireframe transparent opacity={0.3} />
      </mesh>
      <mesh position={[-4, 0.5, -1]}>
        <torusGeometry args={[0.5, 0.18, 12, 32]} />
        <meshBasicMaterial color="#6CE6FF" wireframe transparent opacity={0.25} />
      </mesh>
      <mesh position={[0, 2, -3]}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshBasicMaterial color="#8B7BFF" wireframe transparent opacity={0.22} />
      </mesh>
      <mesh position={[2, -2, -4]}>
        <tetrahedronGeometry args={[0.4, 0]} />
        <meshBasicMaterial color="#4CA8FF" wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function DigitalGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);

  useFrame((state) => {
    if (!gridRef.current) return;
    const t = state.clock.elapsedTime;
    gridRef.current.position.z = (t * 0.5) % 4 - 8;
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[40, 40, 0x4ca8ff, 0x0a1426]}
      position={[0, -4, -8]}
    >
      <meshBasicMaterial transparent opacity={0.08} />
    </gridHelper>
  );
}

export default function ParticleBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    return (
      <div className="fixed inset-0 -z-10 bg-bg-primary">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 bg-bg-primary">
      <Canvas
        camera={{ position: [0, 0, 14], fov: 60 }}
        dpr={[1, isMobile ? 1 : 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Particles count={isMobile ? 700 : 1400} />
        <FloatingShapes />
        <DigitalGrid />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-neon-radial opacity-50" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-30 mask-fade-b" />
    </div>
  );
}
