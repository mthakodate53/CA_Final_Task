import { Outlet } from "react-router-dom";
import Navigation from "../assets/components/Navigation";

function App() {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}

export default App;
