import React, { useState, useEffect, useReducer } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { fetchCars } from "./api";
import CarShowcase from "./components/CarShowcase";
import CarList from "./components/CarList";
import Cart from "./components/Cart";
import LandingPage from "./components/landingPage/LandingPage";
import "./App.css";

const cartReducer = (state, action) => {
  let existingItemIndex;
  let newState;

  switch (action.type) {
    case "ADD_TO_CART":
      existingItemIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex >= 0) {
        newState = state.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newState = [...state, { ...action.payload, quantity: 1 }];
      }
      sessionStorage.setItem("cartItems", JSON.stringify(newState));
      return newState;

    case "UPDATE_QUANTITY":
      newState = state.map((item, index) =>
        index === action.payload.index
          ? {
              ...item,
              quantity:
                action.payload.type === "increase"
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item
      );
      sessionStorage.setItem("cartItems", JSON.stringify(newState));
      return newState;

    case "REMOVE_ITEM":
      newState = state.filter((_, index) => index !== action.payload.index);
      sessionStorage.setItem("cartItems", JSON.stringify(newState));
      return newState;

    case "CLEAR_CART":
      sessionStorage.removeItem("cartItems");
      return [];

    default:
      return state;
  }
};

const StorePage = ({
  cars,
  selectedCar,
  cartItems,
  handleSelectCar,
  handleAddToCart,
  handleUpdateQuantity,
  handleRemoveItem,
  isCartVisible,
  toggleCart,
  clearCart,
}) => {
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="store-page">
      <button className="cart-toggle" onClick={toggleCart}>
        🛒 <span className="cart-badge">{itemCount}</span>
      </button>
      {selectedCar && (
        <CarShowcase car={selectedCar} onAddToCart={handleAddToCart} />
      )}
      <CarList cars={cars} onSelect={handleSelectCar} />
      <Cart
        items={cartItems}
        isVisible={isCartVisible}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCloseCart={toggleCart}
        onClearCart={clearCart}
      />
    </div>
  );
};

const NotFound = () => {
  return (
    <div className="not-found-container">
      <p>"This road doesn't exist, but luxury is just around the corner."</p>
      <p>
        Return to the<Link to="/"> main showroom</Link> and rediscover timeless
        excellence.
      </p>
    </div>
  );
};

const App = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [cartItems, dispatch] = useReducer(cartReducer, [], () => {
    const savedCart = sessionStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
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
    dispatch({ type: "ADD_TO_CART", payload: car });
  };

  const handleUpdateQuantity = (index, type) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { index, type } });
  };

  const handleRemoveItem = (index) => {
    dispatch({ type: "REMOVE_ITEM", payload: { index } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const toggleCart = () => {
    setIsCartVisible(!isCartVisible);
  };

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/store"
          element={
            <StorePage
              cars={cars}
              selectedCar={selectedCar}
              cartItems={cartItems}
              handleSelectCar={handleSelectCar}
              handleAddToCart={handleAddToCart}
              handleUpdateQuantity={handleUpdateQuantity}
              handleRemoveItem={handleRemoveItem}
              isCartVisible={isCartVisible}
              toggleCart={toggleCart}
              clearCart={clearCart}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
