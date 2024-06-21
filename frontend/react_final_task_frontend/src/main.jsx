import ReactDOM from "react-dom/client";
import Home from "./pages/Home";
import AllProducts from "./pages/AllProducts";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import App from "./pages/App";
import About from "./pages/About";
import OrderConfirm from "./pages/OrderConfirm";

import "./pages/index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <AllProducts />,
      },
      {
        path: "/products/:productId",
        element: <ProductPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/about-us",
        element: <About />,
      },
      {
        path: "/order-confirmation",
        element: <OrderConfirm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
