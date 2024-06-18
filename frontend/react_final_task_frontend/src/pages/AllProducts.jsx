import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:5010/products?page=${page}&limit=${limit}`
      );
      const data = await response.json();
      if (data.length > 0) {
        setProducts((prevProducts) => [...prevProducts, ...data]);
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      <h1>All Products</h1>
      <InfiniteScroll
        dataLength={products.length}
        next={fetchProducts}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more products to load</p>}
      >
        {products.map((product, index) => (
          <Link
            to={`/products/${product._id}`}
            key={`${product._id}-${Math.floor(index / limit)}`}
          >
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
      </InfiniteScroll>
    </div>
  );
};

export default AllProductsPage;
