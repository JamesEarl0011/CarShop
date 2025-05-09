import React, { useState, useEffect, useMemo } from "react";
import "./cart.css";

const Cart = ({
  items,
  isVisible,
  onUpdateQuantity,
  onRemoveItem,
  onCloseCart,
  onClearCart,
}) => {
  const [isCheckoutComplete, setIsCheckoutComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(
    "Tailoring elegance to your order…"
  );

  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const messages = useMemo(
    () => [
      "Tailoring elegance to your order…",
      "Polishing the final touch…",
      "Almost ready — perfection takes time.",
    ],
    []
  );

  useEffect(() => {
    let messageInterval;
    if (isLoading) {
      let index = 0;
      messageInterval = setInterval(() => {
        index = (index + 1) % messages.length;
        setLoadingMessage(messages[index]);
      }, 3000);
    }
    return () => clearInterval(messageInterval);
  }, [isLoading, messages]);

  const handleCheckout = () => {
    setIsLoading(true);

    // After 9 seconds, show completion message
    setTimeout(() => {
      setIsLoading(false);
      setIsCheckoutComplete(true);

      // After showing completion message for 5 seconds, reset cart
      setTimeout(() => {
        onClearCart();
        onCloseCart();
        setIsCheckoutComplete(false);
      }, 5000);
    }, 9000);
  };

  return (
    <div className={`cart-container ${isVisible ? "visible" : ""}`}>
      <div className="cart-header">
        <h3>Shopping Cart</h3>
      </div>
      {isCheckoutComplete ? (
        <div className="checkout-message">
          <img src="/brand-badge.png" />
          <p>Luxury is not owned. It is experienced.</p>
          <p>
            Thank you for entrusting Velozium with your next extraordinary
            drive.
          </p>
        </div>
      ) : isLoading ? (
        <div className="lux-progress-container">
          <div className="lux-progress-bar"></div>
          <div className="lux-progress-text">{loadingMessage}</div>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {items.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              items.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.imagePath} alt={item.name} />
                  <div className="item-details">
                    <div className="item-header">
                      <h4>{item.name}</h4>
                      <button
                        className="remove-button"
                        onClick={() => onRemoveItem(index)}
                        title="Remove item"
                      >
                        ×
                      </button>
                    </div>
                    <p>₱{(item.price * item.quantity).toLocaleString()}</p>
                    <div className="quantity-controls">
                      <button
                        onClick={() => onUpdateQuantity(index, "decrease")}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(index, "increase")}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {items.length > 0 && (
            <div className="cart-footer">
              <div className="total-amount">
                <span>Total Amount:</span>
                <span>₱{totalAmount.toLocaleString()}</span>
              </div>
              <button className="checkout-button" onClick={handleCheckout}>
                Finalize my Selection
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
