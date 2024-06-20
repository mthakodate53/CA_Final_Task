import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const AboutUs = () => {
  const mapContainerStyle = {
    width: "70%",
    height: "400px",
  };
  const center = {
    lat: 41.256538,
    lng: -95.934502,
  };
  return (
    <div>
      <h1>About Us</h1>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam, illo
        consequatur. Id exercitationem veritatis beatae incidunt quo reiciendis
        perferendis saepe autem, non quibusdam aperiam optio nulla aut alias
        enim distinctio.
      </p>
      <h2>How to find us</h2>
      <p>123 Main Street, Omaha, NE 68101</p>
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
  );
};

export default AboutUs;
