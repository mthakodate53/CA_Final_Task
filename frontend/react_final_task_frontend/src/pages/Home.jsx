import Hero from "../assets/components/Hero";
import Bestsellers from "../assets/components/Bestsellers";
import Categories from "../assets/components/Categories";
import Intro from "../assets/components/Intro";
import Footer from "../assets/components/Footer";

import "../css/home.css";

const Home = () => {
  return (
    <div className="full-home-wrapper">
      <Hero />
      <Bestsellers />
      <Intro
        heading="Our Story"
        paragraph="Welcome to PlantMore Tree Nursery! Our journey began with a passion for cultivating natural beauty. We started as a small family-owned nursery and have grown into a beloved destination for plant enthusiasts and gardeners. At PlantMore, we believe in the power of greenery to transform spaces and uplift spirits. Join us in our mission to make the world greener, one tree at a time."
        linkUrl="/about-us"
        linkText="Read More"
        imageUrl="/plantmore-staff.jpg"
        imageAlt="PlantMore Tree Nursery"
      />
      <Categories />
      <Footer />
    </div>
  );
};

export default Home;
