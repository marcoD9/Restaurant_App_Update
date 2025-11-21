import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import DishDetails from "./pages/DishDetails.tsx";
import { Root } from "./components/Root.tsx";
import Account from "./pages/Account.tsx";
import Checkout from "./pages/Checkout.tsx";
import Contact from "./pages/Contact.tsx";
import UserOrders from "./pages/UserOrders.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          {" "}
          <Route index element={<Home />} />
          <Route path="/dishes/:id" element={<DishDetails id={""} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account" element={<Account />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/orders" element={<UserOrders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
