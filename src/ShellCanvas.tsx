// Canvas file with simple mesh and orbitcontrols

import { Suspense, useEffect, useRef, useState } from "react";
import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Placeholder from "./Placeholder";
import { MeshBasicMaterial } from "three";

const Shell = () => {
  const refNautilus = useRef<THREE.Mesh>();
  const refConcha = useRef<THREE.Mesh>();
  const refConcha2 = useRef<THREE.Mesh>();
    // load a gltf model
    let { scene: sceneNautilus } = useLoader(
      GLTFLoader,
      "/models/sea_shell/scene.gltf",
      (loader) => {}
    );
    let { scene: sceneConcha } = useLoader(
      GLTFLoader,
      "/models/sea_shell_2/scene.gltf"
    );
    let { scene: sceneConcha2 } = useLoader(
      GLTFLoader,
      "/models/sea_shell_1/scene.gltf"
    );

    sceneConcha.children[0].traverse((child) => {
      if (!child.isMesh) return;
      child.material = new MeshBasicMaterial({
        wireframe: true,
        wireframeLinewidth: 0.1,
        transparent: true,
        opacity: 0.5,
        vertexColors: true,
      });
    });

    sceneConcha2.children[0].traverse((child) => {
      if (!child.isMesh) return;
      child.material = new MeshBasicMaterial({
        wireframe: true,
        wireframeLinewidth: 0.1,
        transparent: true,
        opacity: 0.5,
        lightMap: child.aoMap,
        color: 0x00ff00,
      });
      // child.aoMap = null;
    });

    sceneNautilus.children[0].traverse((child) => {
      if (!child.isMesh) return;
      child.material = new MeshBasicMaterial({
        wireframe: true,
        wireframeLinewidth: 0.1,
        vertexColors: true,
        alphaMap: child.aoMap,
      });
    });

  useFrame(() => {
    if (refNautilus.current) {
      refNautilus.current.rotation.x += 0.01;
      refNautilus.current.rotation.y += 0.01;
    }
    if (refConcha.current) {
      refConcha.current.rotation.x += 0.01;
      refConcha.current.rotation.z += 0.01;
    }
    if (refConcha2.current) {
      refConcha2.current.rotation.x += 0.01;
      refConcha2.current.rotation.y += 0.01;
      refConcha2.current.rotation.y += 0.01;
    }
  });

  // return the scene inside gltf
  return (
    <group position={[0, 0, 0]}>
        <primitive
          object={sceneNautilus.children[0]}
          position={[0.015, 0, -0.01]}
          scale={[2, 2, 2]}
          ref={refNautilus}
        />

        <primitive
          object={sceneConcha.children[0]}
          position={[0, 0, 0]}
          scale={[2, 2, 2]}
          rotation={[0, 0, 0]}
          ref={refConcha}
        />
        <primitive
          object={sceneConcha2}
          position={[-3, -3, -2]}
          scale={[0.08, 0.08, 0.08]}
          ref={refConcha2}
        />
    </group>
  );
};

const ShellCanvas = () => {
  const [clicks, setClicks] = useState(0);
  const handleClick = () => {
    setClicks(clicks + 1);
  };
  return (
    <Canvas
      style={{ background: "black", width: "100%", height: "100%" }}
      camera={{ position: [0, 0, 1], fov: 50 }}
    >
      <OrbitControls />
      <Stars />
      <Suspense fallback={<Placeholder />}>
        <Shell />
      </Suspense>
      {/* plane */}
      {/* lights */}
      <ambientLight intensity={0.5} />
    </Canvas>
  );
};

export default ShellCanvas;
