// Canvas file with simple mesh and orbitcontrols

import  { useRef } from "react";
import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Shell = () => {
  const mesh = useRef<THREE.Mesh>();
  // load a gltf model
  const gltf = useLoader(GLTFLoader, "/models/sea_shell/scene.gltf");
  const gltf2 = useLoader(GLTFLoader, "/models/sea_shell_2/scene.gltf");
  console.log(gltf)

  // Rotate mesh every frame, this is outside of React without overhead

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
    }
  });

  // return the scene inside gltf
  return (
    <group position={[0.1, 0, 0]}>
      <primitive object={gltf.scene.children[0]} />
      <primitive object={gltf2.scene.children[0]} ref={mesh} />
    </group>
  );
};
const Shell2 = () => {
  const mesh2 = useRef<THREE.Mesh>();
  // load a gltf model
  const gltf = useLoader(GLTFLoader, "/models/sea_shell_2/scene.gltf");
  console.log(gltf)

  // Rotate mesh every frame, this is outside of React without overhead

  useFrame(() => {
    if (mesh2.current) {
      mesh2.current.rotation.x += 0.01;
      mesh2.current.rotation.y += 0.01;
    }
  });

  // return the scene inside gltf
  return (
    <group position={[0, 0, 0]}>
      <primitive object={gltf.scene.children[0]} ref={mesh2} />
    </group>
  );
};

const ShellCanvas = () => {
  return (
    <Canvas style={{ background: "black", width: '100%', height: '100%' }}>
      <OrbitControls />
      <Stars />
      
      <Shell />
      {/* lights */}
      <ambientLight intensity={0.5} />
      
    </Canvas>
  );
};

export default ShellCanvas;