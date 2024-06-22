import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../css/productpage.css";
import Footer from "../assets/components/Footer";
import Modal from "../assets/components/Modal";

const TEST_USER_ID = "test_user_123";

const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:5010/products/${productId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data = await response.json();
        setProduct(data);
      } catch (e) {
        setError("Failed to fetch product data");
        console.error("Error:", e);
      } finally {
        setIsLoading(false);
      }
    };
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      const cartItem = {
        productId: product._id,
        name: product.name,
        price: product.discountPrice || product.price,
        quantity,
        userId: TEST_USER_ID,
        imageUrl: product.imageUrl,
      };
      const response = await fetch("http://localhost:5010/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      });
      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }
      const data = await response.json();
      console.log("Item added to cart:", data);
      setModalContent({
        title: "Success",
        message: "Item added to cart successfully!",
        primaryButton: {
          text: "Continue Shopping",
          onClick: () => {},
        },
        secondaryButton: {
          text: "Go to Checkout",
          onClick: () => navigate("/checkout"),
        },
      });
      setIsModalOpen(true);
    } catch (e) {
      console.error("Error adding item to cart:", e);
      setModalContent({
        title: "Error",
        message: "Failed to add item to cart. Please try again.",
        primaryButton: {
          text: "Close",
          onClick: () => {},
        },
      });
      setIsModalOpen(true);
    }
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-page">
      <div className="product-content">
        {product.imageUrl && (
          <div className="product-image">
            <img src={product.imageUrl} alt={product.name} />
          </div>
        )}
        <div className="product-details">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <div className="price-container">
            {product.discountPrice ? (
              <>
                <span className="original-price">${product.price}</span>
                <span className="discount-price">${product.discountPrice}</span>
              </>
            ) : (
              <span>${product.price}</span>
            )}
          </div>
          <p>Stock Quantity: {product.stockQuantity}</p>
          <label htmlFor="quantity"></label>
          <select
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
          >
            {Array.from(
              { length: Math.min(5, product.stockQuantity) },
              (_, i) => (
                <option key={`quantity-option-${i + 1}`} value={i + 1}>
                  {i + 1}
                </option>
              )
            )}
          </select>
          <button
            className="cart-button"
            onClick={handleAddToCart}
            disabled={
              !product.stockQuantity || quantity > product.stockQuantity
            }
          >
            Add to Cart
          </button>
          <Link to="/products" className="back-link">
            Back to All Products
          </Link>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        {...modalContent}
      />
      <Footer />
    </div>
  );
};

export default ProductPage;
