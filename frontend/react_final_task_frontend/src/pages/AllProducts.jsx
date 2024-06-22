import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/allproducts.css";
import Footer from "../assets/components/Footer";
import ProductCard from "../assets/components/ProductCard";

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
        `http://localhost:5010/products?page=${1}&limit=${50}&category=${categoryParam}`
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

  const currentCategory =
    new URLSearchParams(location.search).get("category") || "All";

  return (
    <div className="page-container">
      <div className="content-wrap">
        <div className="all-products-page">
          <h1>PlantMore Tree Selection</h1>
          <p className="all-products-text">
            Trees play a crucial role in promoting sustainability by absorbing
            carbon dioxide and producing oxygen, helping to mitigate climate
            change. Planting more trees can enhance biodiversity, prevent soil
            erosion, and create natural habitats for wildlife, making it an
            effective strategy for environmental conservation. For those looking
            to make a positive impact, our carefully selected, high-quality
            saplings offer an excellent way to contribute to a greener future.
          </p>
          <div className="categories-links">
            <Link
              to="/products"
              className={currentCategory === "All" ? "active-category" : ""}
            >
              All
            </Link>
            {categories.map((category) => (
              <Link
                key={category._id}
                to={`/products?category=${category.name}`}
                className={
                  currentCategory === category.name ? "active-category" : ""
                }
              >
                {category.title}
              </Link>
            ))}
          </div>
          <div className="product-list">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllProductsPage;
