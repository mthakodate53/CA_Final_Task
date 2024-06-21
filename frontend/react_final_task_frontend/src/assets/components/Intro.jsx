import "../../css/intro.css";

const Intro = () => {
  return (
    <div className="intro-section">
      <div className="intro-text">
        <h2>Our Story</h2>
        <p>
          Welcome to PlantMore Tree Nursery! Our journey began with a passion
          for cultivating natural beauty. We started as a small family-owned
          nursery and have grown into a beloved destination for plant
          enthusiasts and gardeners. At PlantMore, we believe in the power of
          greenery to transform spaces and uplift spirits. Join us in our
          mission to make the world greener, one tree at a time.
        </p>
        <div className="read-more">
          <a href="/about-us">Read More</a>
        </div>
      </div>
      <div className="intro-image">
        <img src="/plantmore-staff.jpg" alt="PlantMore Tree Nursery" />
      </div>
    </div>
  );
};

export default Intro;
