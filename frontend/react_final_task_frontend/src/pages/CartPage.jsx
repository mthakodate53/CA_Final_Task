import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../assets/components/Footer";

const CartPage = () => {
  const userId = "test_user_123";
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5010/cart/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch cart data");
        }
        const data = await response.json();
        setCart(data.items);
      } catch (e) {
        setError("Failed to fetch cart data");
        console.error("Error:", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  const changeQuantity = async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    try {
      const response = await fetch(`http://localhost:5010/cart/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          quantity: newQuantity,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update cart item quantity");
      }
      const updatedCart = await response.json();
      setCart(updatedCart.items);
    } catch (e) {
      console.error("Error updating cart item quantity:", e);
      alert("Failed to update cart item quantity. Please try again.");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5010/cart/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }
      const updatedCart = await response.json();
      setCart(updatedCart.items);
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
    return total;
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (cart.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.productId}>
            <div>
              <h2>{item.name}</h2>
              <p>Price: ${item.price}</p>
              <p>Total Price: ${(item.price * item.quantity).toFixed(2)}</p>
              <div>
                <button
                  onClick={() =>
                    changeQuantity(item.productId, item.quantity - 1)
                  }
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    changeQuantity(item.productId, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
              <button onClick={() => removeFromCart(item.productId)}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h3>Total Price: ${calculatePrice()}</h3>
      <Link to="/products">Back to All Products</Link>
      <Footer />
    </div>
  );
};

export default CartPage;
