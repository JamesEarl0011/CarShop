import React, { useEffect, useState } from "react";
import { fetchCars } from "../api";
import { Link } from "react-router-dom";
import "./CarGrid.css";

const CarGrid = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const getCars = async () => {
      try {
        const carData = await fetchCars();
        setCars(carData);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      }
    };

    getCars();
  }, []);

  return (
    <div className="car-grid">
      {cars.map((car) => (
        <div key={car.id} className="car-item">
          <Link to={`/car/${car.id}`}>
            <img src={car.imagePath} alt={car.name} loading="lazy" />
            <h3>{car.name}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CarGrid;
