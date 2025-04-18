import React from "react";
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  Html,
  useProgress,
  Bounds,
  Environment,
} from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress}% loaded</Html>;
}

const Model = () => {
  const gltf = useLoader(GLTFLoader, "/models/rolls-royce-silver-shadow.glb");
  return <primitive object={gltf.scene} />;
};

const ModelViewer = () => {
  const position = [17, 5, 20];
  return (
    <>
      <div style={{ height: "100vh", width: "100vw" }}>
        <Canvas
          camera={{
            position: [position[0], position[1], position[2]],
            fov: 50,
            near: 0.1,
            far: 1000,
          }}
        >
          <React.Suspense fallback={<Loader />}>
            {/* Lighting setup */}
            <ambientLight intensity={0.3} color="#ffffff" />
            <directionalLight
              position={[10, 20, 10]}
              intensity={2}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              color="#ffffff"
            />
            <directionalLight
              position={[-10, 20, -10]}
              intensity={1.5}
              color="#ffefd5"
            />
            <pointLight position={[0, 10, 0]} intensity={0.5} color="#ffffff" />

            <Environment preset="city" />

            <Bounds fit margin={1.2}>
              <Model />
            </Bounds>

            {/* Modified OrbitControls to disable panning */}
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              enableRotate={true}
              zoomSpeed={0.6}
              rotateSpeed={0.8}
              target={[0, 0, 0]}
              minDistance={10}
              maxDistance={30}
              screenSpacePanning={false}
              panSpeed={0}
            />
          </React.Suspense>
        </Canvas>
      </div>
    </>
  );
};

export default ModelViewer;
