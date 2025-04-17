import React, { useState, useEffect } from "react";
import { fetchCars } from "./api";
import CarShowcase from "./components/CarShowcase";
import CarList from "./components/CarList";

const App = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    const loadCars = async () => {
      try {
        const data = await fetchCars();
        setCars(data);
        if (data.length > 0) {
          setSelectedCar(data[0]);
        }
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      }
    };

    loadCars();
  }, []);

  const handleSelectCar = (car) => {
    setSelectedCar(car);
  };

  return (
    <div className="app">
      {selectedCar && <CarShowcase car={selectedCar} />}
      <CarList cars={cars} onSelect={handleSelectCar} />
    </div>
  );
};

export default App;
