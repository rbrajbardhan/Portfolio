import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

const ParticleField = ({ count = 4000 }) => {
  const pointsRef = useRef();

  // Generate random spherical particles
  const [positions, fixedPositions] = useMemo(() => {
    const p = new Float32Array(count * 3);
    const fp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Create a floating cloud effect, spread wider
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 15;

      p[i * 3] = x;
      p[i * 3 + 1] = y;
      p[i * 3 + 2] = z;

      // Keep original positions for wave/noise math
      fp[i * 3] = x;
      fp[i * 3 + 1] = y;
      fp[i * 3 + 2] = z;
    }
    return [p, fp];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const positionsArray = pointsRef.current.geometry.attributes.position.array;

    // Subtle wave motion
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const x = fixedPositions[ix];
      const z = fixedPositions[ix + 2];

      // Gently oscillate the Y position based on X/Z and time
      positionsArray[ix + 1] =
        fixedPositions[ix + 1] +
        Math.sin(time * 0.5 + x) * 0.2 +
        Math.cos(time * 0.3 + z) * 0.2;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Slow global rotation
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.x = time * 0.02;
  });

  return (
    <Points
      ref={pointsRef}
      positions={positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#06b6d4" // Cyan
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={2} // Additive blending for glow
        opacity={0.6}
      />
    </Points>
  );
};

export default ParticleField;
