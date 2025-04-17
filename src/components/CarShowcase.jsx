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
        <center>
          <div className="content">
            <h2>{car.name}</h2>
            <p>{car.description}</p>
            <h3>Price: {car.price}</h3>
            <button onClick={() => onAddToCart(car)}>Buy Now</button>
          </div>
        </center>
      </div>
      <div
        className="car-showcase"
        style={{
          width: "68vw",
          height: "78vh",
          position: "absolute",
          top: "0",
          left: "31vw",
        }}
      >
        <Canvas
          camera={{
            position: [20, 10, 5, 10],
            scale: 100,
            fov: 50,
            near: 0.1,
            far: 10,
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
              enableZoom={false}
              enablePan={false}
              enableRotate={true}
              rotateSpeed={0.7}
              target={[0, 0, 0]}
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
