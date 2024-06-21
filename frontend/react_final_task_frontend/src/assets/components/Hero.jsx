import "../../css/hero.css";
import heroimg from "../images/plantmore-hero-1.jpg";

const Hero = () => {
  return (
    <div className="hero" style={{ backgroundImage: `url(${heroimg})` }}>
      <div className="hero-content">
        <h1>Welcome to PlantMore Store</h1>
        <p className="description">
          Discover our wide selection of sustainably grown plants. Whether you
          are a beginner or an enthusiast, our team is here to help you create
          your perfect green space.
        </p>
        <a href="/products" className="cta-button">
          Explore Our Collection
        </a>
      </div>
    </div>
  );
};

export default Hero;
