import { BrowserRouter, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Home from "./Home";
import AllProducts from "./AllProducts";
import ProductPage from "./ProductPage";
import CartPage from "./CartPage";
import Checkout from "./Checkout";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Route path="/" exact component={Home} />
      <Route path="/products" exact component={AllProducts} />
      <Route path="/products/:id" component={ProductPage} />
      <Route path="/cart" component={CartPage} />
      <Route path="/checkout" component={Checkout} />
    </BrowserRouter>
  );
}

export default App;
