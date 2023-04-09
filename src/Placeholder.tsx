import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Placeholder()
{
  const mesh = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });
    return <mesh position-y={ 0 } scale={ [ 0.5, 0.5, 0.5 ] } ref={mesh}>
        <boxGeometry args={ [ 1, 1, 1, 2, 2, 2 ] } />
        <meshBasicMaterial wireframe color="cyan" />
    </mesh>
}