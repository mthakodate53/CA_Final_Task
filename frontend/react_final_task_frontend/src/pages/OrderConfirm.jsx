import { useLocation } from "react-router-dom";

import "../css/orderconfirm.css";

const OrderConfirmPage = () => {
  const location = useLocation();
  const { state } = location;
  const orderId = state?.orderId;

  return (
    <div className="order-confirm-page">
      <h1>Order Confirmation</h1>
      {orderId ? (
        <div>
          <p>Thanks for shopping at PlantMore store!</p>
          <p>
            {" "}
            Your order has been placed successfully! Your order ID is{" "}
            <strong>{orderId}</strong>.
          </p>
        </div>
      ) : (
        <p>Somethxing went wrong. We could not find your order information.</p>
      )}
    </div>
  );
};

export default OrderConfirmPage;
