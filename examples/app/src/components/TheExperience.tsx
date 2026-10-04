import { useRef, useState } from "react";

import { Grid, OrbitControls } from "@react-three/drei";
import {
  Canvas,
  type CanvasProps,
  type ThreeElements,
  useFrame,
} from "@react-three/fiber";
import type * as THREE from "three";

function Box(props: ThreeElements["mesh"]) {
  const meshRef = useRef<THREE.Mesh>(null!);

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((_state, delta) => (meshRef.current.rotation.x += delta));

  return (
    <mesh
      {...props}
      onClick={(_event) => setActive(!active)}
      onPointerOut={(_event) => setHover(false)}
      onPointerOver={(_event) => setHover(true)}
      ref={meshRef}
      scale={active ? 1.5 : 1}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "#2f74c0"} />
    </mesh>
  );
}

function FirstExperience(props: CanvasProps) {
  return (
    <Canvas {...props}>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        angle={0.15}
        decay={0}
        intensity={Math.PI}
        penumbra={1}
        position={[10, 10, 10]}
      />
      <pointLight decay={0} intensity={Math.PI} position={[-10, -10, -10]} />

      <Grid
        args={[20, 20]}
        cellColor="#6f6f6f"
        cellSize={1}
        cellThickness={0.6}
        fadeDistance={30}
        fadeStrength={1}
        infiniteGrid
        sectionColor="#9f9f9f"
        sectionSize={5}
        sectionThickness={1.2}
      />

      <Box position={[0, 0, 0]} />

      <OrbitControls makeDefault />
    </Canvas>
  );
}

export default FirstExperience;
