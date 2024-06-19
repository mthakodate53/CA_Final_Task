import { useState, useEffect } from "react";

const CategoryLinks = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5010/categories"); // Adjust to your backend endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="category-links">
      <h2>Shop by Category</h2>
      <div className="category-list">
        {categories.map((category) => (
          <div key={category._id} className="category-item">
            <a href={`/products/${category.slug}`}>
              <img src={category.imageUrl} alt={"Alt:" + category.name} />
              <p>{category.name}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryLinks;
