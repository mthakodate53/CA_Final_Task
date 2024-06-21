import "../../css/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>Contact us: hello@plantmore.co | Phone: 123-456-7890</p>
        <p>
          <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a> |{" "}
          <a href="#">About Us</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
