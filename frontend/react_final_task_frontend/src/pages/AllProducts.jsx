import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../assets/components/Footer";

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5010/categories");
      const data = await response.json();
      setCategories(data);
    } catch (e) {
      console.error("Error fetching categories:", e);
    }
  };

  const fetchProducts = useCallback(async () => {
    try {
      const params = new URLSearchParams(location.search);
      const categoryParam = params.get("category") || "";
      const response = await fetch(
        `http://localhost:5010/products?category=${categoryParam}`
      );
      const data = await response.json();
      setProducts(data);
    } catch (e) {
      console.error("Error fetching products:", e);
    }
  }, [location.search]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <div>
        <h1>PlantMore Tree Selection</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
          ullam quas laborum maxime veniam pariatur, quis, quidem dignissimos
          voluptatum nemo optio odio veritatis beatae sit sed debitis voluptate
          possimus eaque!
        </p>
        <div>
          <Link to="/products">All</Link>
          {categories.map((category) => (
            <Link key={category._id} to={`/products?category=${category.name}`}>
              {category.name}
            </Link>
          ))}
        </div>
        {products.map((product) => (
          <Link to={`/products/${product._id}`} key={product._id}>
            <div>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
              {product.imageUrl && (
                <img src={product.imageUrl} alt={product.name} />
              )}
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default AllProductsPage;
