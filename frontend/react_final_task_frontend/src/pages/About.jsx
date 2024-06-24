import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "../css/about.css";
import Intro from "../assets/components/Intro";
import Video from "../assets/components/Video";
import Footer from "../assets/components/Footer";

const About = () => {
  const mapContainerStyle = {
    width: "100%",
    height: "400px",

    marginBottom: "20px",
  };
  const center = {
    lat: 43.0491,
    lng: -108.3665,
  };

  const isMobileScreen = window.innerWidth <= 600;

  return (
    <>
      {!isMobileScreen && (
        <Intro
          heading="About PlantMore"
          paragraph="Welcome to PlantMore Tree Nursery! Our journey began with a passion for cultivating natural beauty. We started as a small family-owned nursery and have grown into a beloved destination for plant enthusiasts and gardeners. At PlantMore, we believe in the power of greenery to transform spaces and uplift spirits. Join us in our mission to make the world greener, one tree at a time."
          imageUrl="./plantmore-team.jpg"
          imageAlt="PlantMore Tree Nursery"
        />
      )}
      <div className="video-content-section">
        <div className="video-container">
          <Video videoId="NU2zNhbyTkU" />
        </div>
        <div className="text-container">
          <h2>Dedicated to Tree Health</h2>
          <p>
            At PlantMore, our expansive array of trees, shrubs, and plants
            ensures that you will find the ideal addition for your home or
            garden, regardless of your gardening expertise. We are committed to
            providing expert advice, personalized service, and premium-quality
            plants, ensuring your green space thrives with health and vitality.
            Visit us today to experience the pleasure of gardening with
            PlantMore.
          </p>
        </div>
      </div>
      <div className="map-section-container">
        <div className="address-container">
          <h2>How to Find Us</h2>
          <p>1500 State Highway 789, Riverton, WY 82501, USA</p>
          <div>
            <ul>
              <li>
                <strong>Monday - Friday:</strong> 9:00 AM - 7:00 PM
              </li>
              <li>
                <strong>Saturday:</strong> 9:00 AM - 4:00 PM
              </li>
              <li>
                <strong>Sunday:</strong> 9:00 AM - 2:00 PM
              </li>
            </ul>
            <p>
              <em>
                Note: During the winter season, please call ahead for weekend
                appointments.
              </em>
            </p>
          </div>
        </div>
        <div className="map-container">
          <LoadScript
            googleMapsApiKey="AIzaSyATqRs_WVIHbZJTuEiHC_5eviPaqd5iMQE"
            loading="async"
          >
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={13}
            >
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
