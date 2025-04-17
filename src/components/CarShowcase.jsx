import React, { useEffect, useState } from "react";
import "./carShowcase.css";
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

const CarShowcase = ({ car }) => {
  let [x, setX] = useState(car.position.x);
  let [y, setY] = useState(car.position.y);
  let [z, setZ] = useState(car.position.z);

  function handlePosition() {
    setX(car.position.x);
    setY(car.position.y);
    setZ(car.position.z);
  }

  function Loader() {
    handlePosition();
    const { progress } = useProgress();
    return <Html center>{progress}% loaded</Html>;
  }

  const Model = () => {
    const gltf = useLoader(GLTFLoader, car.glbPath);
    return <primitive object={gltf.scene} />;
  };

  if (!car || !car.position) {
    return <div>No car selected</div>;
  }

  return (
    <>
      <div className="car-details">
        <h2>{car.name}</h2>
        <p>{car.description}</p>
        <p>Price: {car.price}</p>
      </div>
      <div
        className="car-showcase"
        style={{
          width: "100%",
          height: "78vh",
          position: "absolute",
          top: "0",
          left: "0",
        }}
      >
        <Canvas
          camera={{
            position: [x, y, z],
            fov: 50,
            near: 0.1,
            far: 700,
          }}
        >
          <React.Suspense fallback={<Loader />}>
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

export default CarShowcase;
