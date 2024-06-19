import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
      } catch (error) {
        setError("Failed to fetch product data");
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>
        Price: {product.discountPrice ? product.discountPrice : product.price}
      </p>
      <p>Stock Quantity: {product.stockQuantity}</p>
      <button disabled={!product.stockQuantity}>Add to Cart</button>
      {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
    </div>
  );
};

export default ProductPage;
