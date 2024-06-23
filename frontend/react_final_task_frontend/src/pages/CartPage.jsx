import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/cartpage.css";

const TEST_USER_ID = "test_user_123";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:5010/cart/${TEST_USER_ID}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }
        const data = await response.json();

        const productCache = {};
        const productDetailsPromises = data.items.map(async (item) => {
          if (!productCache[item.productId]) {
            const productResponse = await fetch(
              `http://localhost:5010/products/${item.productId}`
            );
            if (!productResponse.ok) {
              throw new Error("Failed to fetch product data");
            }
            const productData = await productResponse.json();
            productCache[item.productId] = productData;
          }
          return { ...item, imageUrl: productCache[item.productId].imageUrl };
        });

        const productDetails = await Promise.all(productDetailsPromises);
        setCart(productDetails);
      } catch (e) {
        setError("Failed to fetch cart data");
        console.error("Error:", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  const changeQuantity = async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5010/cart/${TEST_USER_ID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
            quantity: newQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update cart item quantity");
      }
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (e) {
      console.error("Error updating cart item quantity:", e);
      alert("Failed to update cart item quantity. Please try again.");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:5010/cart/${TEST_USER_ID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }
      setCart((prevCart) =>
        prevCart.filter((item) => item.productId !== productId)
      );
    } catch (e) {
      console.error("Error removing item from cart:", e);
      alert("Failed to remove item from cart. Please try again.");
    }
  };

  const calculatePrice = () => {
    let total = 0;
    for (const item of cart) {
      total += item.price * item.quantity;
    }
    return total.toFixed(2);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (cart.length === 0) {
    return (
      <h2 className="empty-cart">
        Your cart is empty, time to add something 😴
      </h2>
    );
  }

  return (
    <div className="cart-page-container">
      <div className="content-wrap">
        <div className="cart-wrapper">
          <h1 className="cart-header">Your Cart</h1>
          <ul>
            {cart.map((item) => (
              <li key={item.productId} className="cart-item">
                <img src={item.imageUrl} alt={item.name} />
                <div className="cart-item-content">
                  <h2>{item.name}</h2>
                  <p>Price: ${item.price}</p>
                  <p>Total Price: ${item.price * item.quantity}</p>
                </div>
                <div className="item-actions">
                  <div className="quantity-controls">
                    <button
                      className="quantity-button"
                      onClick={() =>
                        changeQuantity(item.productId, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="item-quantity-digit">{item.quantity}</span>
                    <button
                      className="quantity-button"
                      onClick={() =>
                        changeQuantity(item.productId, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.productId)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total Price: ${calculatePrice()}</h3>
          </div>
          <div className="cart-links">
            <Link to="/products">Back to All Products</Link>
            <Link to="/checkout">Proceed to Checkout</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
