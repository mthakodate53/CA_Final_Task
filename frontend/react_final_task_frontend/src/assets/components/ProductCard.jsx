import { Link } from "react-router-dom";
import "../../css/productcard.css";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`} className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <h4>
        {product.name}
        <span className="pricing"> | ${product.price}</span>
      </h4>
    </Link>
  );
};

export default ProductCard;
