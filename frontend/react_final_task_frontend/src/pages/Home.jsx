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
      <Intro />
      <Categories />
      <Footer />
    </div>
  );
};

export default Home;
