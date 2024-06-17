import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

function App() {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}

export default App;
