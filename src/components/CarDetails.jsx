import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ModelLoader from "./ModelLoader";
import { fetchCars } from "../api";
import ErrorBoundary from "./ErrorBoundary"; // Import the ErrorBoundary

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const getCar = async () => {
      try {
        const carData = await fetchCars();
        const selectedCar = carData.find((car) => car.id === id);
        setCar(selectedCar);
      } catch (error) {
        console.error("Failed to fetch car details:", error);
      }
    };

    getCar();
  }, [id]);

  if (!car) return <div>Loading...</div>;

  return (
    <div className="car-details">
      <h2>{car.name}</h2>
      <p>{car.description}</p>
      <p>Price: {car.price}</p>
      <div className="car-model">
        <ErrorBoundary>
          <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <OrbitControls />
            <React.Suspense fallback={<div>Loading model...</div>}>
              <ModelLoader modelPath={car.glbPath} />
            </React.Suspense>
          </Canvas>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default CarDetails;
