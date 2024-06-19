import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const limit = 10;
  const location = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5010/categories");
        const data = await response.json();
        setCategories(data);
      } catch (e) {
        console.error("Error fetching categories:", e);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get("category");
    setCategory(categoryParam || "");
    setPage(1);
    setProducts([]);
  }, [location.search]);

  useEffect(() => {
    fetchProducts();
  }, [page, category]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:5010/products?page=${page}&limit=${limit}&category=${category}`
      );
      const data = await response.json();
      setProducts((prevProducts) => [...prevProducts, ...data]);
    } catch (e) {
      console.error("Error fetching products:", e);
    }
  };

  return (
    <div>
      <h1>All Products</h1>
      <div>
        <Link to="/products">All</Link>
        {categories.map((cat) => (
          <Link key={cat._id} to={`/products?category=${cat.name}`}>
            {cat.name}
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
  );
};

export default AllProductsPage;
