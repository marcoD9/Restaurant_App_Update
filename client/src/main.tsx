import { Provider } from "@/components/ui/provider";
import { AuthProvider } from "./contexts/AuthContext";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./contexts/CartContext";
import { Toaster } from "./components/ui/toaster";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      {" "}
      <AuthProvider>
        <CartProvider>
          {" "}
          <App />
          <Toaster />
        </CartProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
