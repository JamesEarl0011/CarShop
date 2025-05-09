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

const CarShowcase = ({ car, onAddToCart }) => {
  function Loader() {
    const { progress } = useProgress();
    return (
      <Html
        center
        style={{ width: "120px", fontFamily: "Cormorant", fontSize: "1.5em" }}
      >
        {Math.round(progress)}% loaded
      </Html>
    );
  }

  const Model = () => {
    const gltf = useLoader(GLTFLoader, car.glbPath);
    return <primitive object={gltf.scene} />;
  };

  if (!car) {
    return <div>No car selected</div>;
  }

  return (
    <>
      <div className="car-details">
        <center>
          <div className="content">
            <h2>{car.name}</h2>
            <p>{car.description}</p>
            <h3>Price: ₱{car.price.toLocaleString()}</h3>
            <button onClick={() => onAddToCart(car)}>Buy Now</button>
          </div>
        </center>
      </div>
      <div
        className="car-showcase"
        style={{
          width: "68vw",
          height: "70vh",
          position: "absolute",
          top: "0",
          left: "31vw",
        }}
      >
        <Canvas
          camera={{
            position: [0, -50, 0],
            fov: 75,
            near: 0.1,
            far: 50,
          }}
        >
          <React.Suspense fallback={<Loader />}>
            <ambientLight intensity={1} color="#000" />
            <directionalLight
              position={[10, 20, 10]}
              intensity={5}
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

            <Bounds fit margin={1}>
              <Model />
            </Bounds>

            <OrbitControls
              enableZoom={true}
              enablePan={false}
              enableRotate={true}
              rotateSpeed={0.7}
              target={[0, 0, 0]}
              screenSpacePanning={false}
              minDistance={15}
              maxDistance={30}
            />
          </React.Suspense>
        </Canvas>
      </div>
    </>
  );
};

export default CarShowcase;
