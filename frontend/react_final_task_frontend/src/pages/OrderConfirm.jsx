import { useLocation } from "react-router-dom";

const OrderConfirmPage = () => {
  const location = useLocation();
  const { state } = location;
  const orderId = state?.orderId;

  return (
    <div className="order-confirm-page">
      <h1>Order Confirmation</h1>
      {orderId ? (
        <p>
          Your order has been placed successfully! Your order ID is {orderId}.
        </p>
      ) : (
        <p>Something went wrong. We could not find your order information.</p>
      )}
    </div>
  );
};

export default OrderConfirmPage;
