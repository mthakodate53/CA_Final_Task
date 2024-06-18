import Hero from "../assets/components/Hero";
import Bestsellers from "../assets/components/Bestsellers";
import Categories from "../assets/components/Categories";
import Intro from "../assets/components/Intro";
import Footer from "../assets/components/Footer";

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="main-home-wrapper">
        <Bestsellers />
        <Categories />
        <Intro />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
