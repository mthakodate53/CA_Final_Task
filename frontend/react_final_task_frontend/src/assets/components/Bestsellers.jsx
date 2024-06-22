import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../css/bestsellers.css";
import Modal from "./Modal";

const TEST_USER_ID = "test_user_123";

const Bestsellers = () => {
  const [bestsellers, setBestsellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const bestsellerIds = [
    "6670ca3cdde10c7db663182b",
    "6670ca3cdde10c7db6631833",
    "6670ca3cdde10c7db6631834",
  ];

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedProducts = await Promise.all(
          bestsellerIds.map(async (id) => {
            const response = await fetch(
              `http://localhost:5010/products/${id}`
            );
            if (!response.ok) {
              throw new Error(`Failed to fetch product with ID: ${id}`);
            }
            return response.json();
          })
        );
        setBestsellers(fetchedProducts);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBestsellers();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      const cartItem = {
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        userId: TEST_USER_ID,
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
      console.log("Item added to cart");
      showSuccessModal();
    } catch (e) {
      console.error("Error adding item to cart:", e);
    }
  };

  const showSuccessModal = () => {
    setModalContent({
      title: "Success",
      message: "Item added to cart successfully!",
      primaryButton: {
        text: "Continue Shopping",
        onClick: () => closeModal(),
      },
      secondaryButton: {
        text: "Go to Cart",
        onClick: () => {
          closeModal();
          window.location.href = "/cart";
        },
      },
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bestsellers-section">
      <h2>Our Bestsellers</h2>
      <div className="product-list">
        {bestsellers.map((product) => (
          <div key={product._id} className="product-item">
            <Link to={`/products/${product._id}`} className="product-link">
              <img src={product.imageUrl} alt={product.name} />
              <h4>
                {product.name}
                <span className="pricing"> | ${product.price}</span>
              </h4>
            </Link>
            <button
              className="cart-button"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalContent.title}
        message={modalContent.message}
        primaryButton={modalContent.primaryButton}
        secondaryButton={modalContent.secondaryButton}
      />
    </div>
  );
};

export default Bestsellers;
