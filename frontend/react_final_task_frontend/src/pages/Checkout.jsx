import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../assets/components/Modal";
import "../css/checkout.css";

const TEST_USER_ID = "test_user_123";
const COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo, Democratic Republic of the",
  "Congo, Republic of the",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, North",
  "Korea, South",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
  });
  const [creditCardInfo, setCreditCardInfo] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    primaryButton: null,
    secondaryButton: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5010/cart/${TEST_USER_ID}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }
      const data = await response.json();
      setCartItems(data.items);
      calculateTotal(data.items);
    } catch (e) {
      console.error("Error fetching cart items:", e);
      setError("Failed to fetch cart items.");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotal = (items) => {
    let sum = 0;
    for (let i = 0; i < items.length; i++) {
      sum += items[i].price * items[i].quantity;
    }
    setTotal(sum);
  };

  const changeShipInfo = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const changePaymentInfo = (e) => {
    setCreditCardInfo({ ...creditCardInfo, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, address, city, zipCode, country } = shippingInfo;
    const { number, expiry, cvv } = creditCardInfo;

    if (!name || !address || !city || !zipCode || !country) {
      setError("Please fill in all fields.");
      return false;
    }

    const cardNumberRegex = /^[0-9]{16}$/;
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    const cvvRegex = /^[0-9]{3,4}$/;
    const zipCodeRegex = /^[A-Za-z0-9]{4,10}$/;

    if (!cardNumberRegex.test(number)) {
      setError("Please enter a valid credit card number.");
      return false;
    }

    if (!expiryDateRegex.test(expiry)) {
      setError("Please enter a valid expiry date (MM/YY).");
      return false;
    }

    if (!cvvRegex.test(cvv)) {
      setError("Please enter a valid 3 or 4-digit CVV.");
      return false;
    }

    if (!zipCodeRegex.test(zipCode)) {
      setError("Please enter a valid zip code.");
      return false;
    }

    return true;
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const orderResponse = await fetch(
        `http://localhost:5010/orders/${TEST_USER_ID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: cartItems,
            total,
            shippingInfo,
            paymentMethod: "credit_card",
            creditCardInfo,
          }),
        }
      );
      if (!orderResponse.ok) {
        throw new Error("Failed to create order");
      }
      const orderData = await orderResponse.json();
      console.log(orderData);

      const paymentResponse = await fetch(
        `http://localhost:5010/process-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: orderData._id,
            paymentMethod: "credit_card",
            creditCardInfo,
          }),
        }
      );
      if (paymentResponse.ok) {
        await fetch(`http://localhost:5010/cart/${TEST_USER_ID}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: [],
          }),
        });
        navigate("/order-confirmation", {
          state: { orderId: orderData._id },
        });
      } else {
        throw new Error("Payment processing failed");
      }
    } catch (e) {
      console.error("Checkout error:", e);
      setModal({
        isOpen: true,
        title: "Error",
        message: "There was an error processing your order. Please try again.",
        primaryButton: {
          text: "OK",
          onClick: () => setModal({ ...modal, isOpen: false }),
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="form-wrapper">
        <div className="cart-summary">
          <h2>Your Cart</h2>
          {isLoading ? (
            <p>Loading cart items...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            cartItems.map((item) => (
              <div key={item._id + item.name} className="cart-item">
                <p>
                  {item.name} - Quantity: {item.quantity} - Price: $
                  {item.price * item.quantity}
                </p>
              </div>
            ))
          )}
          <h3>Total: ${total}</h3>
        </div>
        <form onSubmit={handleCheckout} className="checkout-form">
          <div className="form-section">
            <h2>Shipping Address</h2>
            <input
              type="text"
              name="name"
              value={shippingInfo.name}
              onChange={changeShipInfo}
              placeholder="Full Name"
              required
            />
            <input
              type="text"
              name="address"
              value={shippingInfo.address}
              onChange={changeShipInfo}
              placeholder="Address"
              required
            />
            <input
              type="text"
              name="city"
              value={shippingInfo.city}
              onChange={changeShipInfo}
              placeholder="City"
              required
            />
            <input
              type="text"
              name="zipCode"
              value={shippingInfo.zipCode}
              onChange={changeShipInfo}
              placeholder="Zip Code"
              required
            />
            <select
              name="country"
              value={shippingInfo.country}
              onChange={changeShipInfo}
              required
            >
              <option value="" disabled>
                Select Country
              </option>
              {COUNTRIES.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="form-section">
            <h2>Payment Information</h2>
            <input
              type="text"
              name="number"
              value={creditCardInfo.number}
              onChange={changePaymentInfo}
              placeholder="Credit Card Number"
              required
            />
            <input
              type="text"
              name="expiry"
              value={creditCardInfo.expiry}
              onChange={changePaymentInfo}
              placeholder="Expiry Date (MM/YY)"
              required
            />
            <input
              type="text"
              name="cvv"
              value={creditCardInfo.cvv}
              onChange={changePaymentInfo}
              placeholder="CVV"
              required
            />
            {error && <p className="error">{error}</p>}
            <div className="form-bottom">
              <div className="cards-img">
                <img src="./visa.svg" />
                <img src="./mastercard.svg" />
                <img src="./american-express.svg" />
              </div>
              <button
                type="submit"
                className="place-order-btn"
                disabled={isLoading}
              >
                {isLoading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </form>
      </div>
      {modal.isOpen && (
        <Modal
          title={modal.title}
          message={modal.message}
          primaryButton={modal.primaryButton}
          secondaryButton={modal.secondaryButton}
        />
      )}
    </div>
  );
};

export default Checkout;
