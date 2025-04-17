import React from "react";
import "./cart.css";

const Cart = ({ items, isVisible, onToggle }) => {
  return (
    <div className={`cart-container ${isVisible ? "visible" : ""}`}>
      <div className="cart-header">
        <h3>Shopping Cart</h3>
        <button onClick={onToggle} className="close-cart">
          ×
        </button>
      </div>
      <div className="cart-items">
        {items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          items.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.imagePath} alt={item.name} />
              <div className="item-details">
                <h4>{item.name}</h4>
                <p>${item.price}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Cart;
