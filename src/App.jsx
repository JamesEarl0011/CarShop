import React, { useState, useEffect } from "react";
import { fetchCars } from "./api";
import CarShowcase from "./components/CarShowcase";
import CarList from "./components/CarList";
import Cart from "./components/Cart";
import "./App.css";

const App = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  useEffect(() => {
    const loadCars = async () => {
      try {
        const data = await fetchCars();
        setCars(data);
        if (data.length > 0) {
          setSelectedCar(data[1]);
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

  const handleAddToCart = (car) => {
    setCartItems([
      ...cartItems,
      {
        imagePath: car.imagePath,
        name: car.name,
        price: car.price,
      },
    ]);
  };

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <div className="app">
      <button className="cart-toggle" onClick={toggleCart}>
        🛒 Cart ({cartItems.length})
      </button>
      {selectedCar && (
        <CarShowcase car={selectedCar} onAddToCart={handleAddToCart} />
      )}
      <CarList cars={cars} onSelect={handleSelectCar} />
      <Cart items={cartItems} isVisible={isCartVisible} onToggle={toggleCart} />
    </div>
  );
};

export default App;
