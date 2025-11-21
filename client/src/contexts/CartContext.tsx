import React, { createContext, useState, useContext, useEffect } from "react";
import { createOrder } from "../api";
import { Order } from "../types";
import CartToastManager from "@/components/CartToastManager";

interface CartContextType {
  cartItems: { dishId: string; quantity: number }[];
  addToCart: (dishId: string, quantity: number) => void;
  removeFromCart: (dishId: string) => void;
  error: string | null;
  success: string | null;
  info: string | null;
  setError: (message: string | null) => void;
  setSuccess: (message: string | null) => void;
  setInfo: (message: string | null) => void;
  clearSuccess: () => void;
  clearInfo: () => void;
  clearError: () => void;
  clearCart: () => void;
  createOrderFromCart: (
    token: string,
    time: Date,
    userId: string
  ) => Promise<Order | null>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<
    { dishId: string; quantity: number }[]
  >(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (dishId: string, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.dishId === dishId);
      if (existingItem) {
        return prevItems.map((item) =>
          item.dishId === dishId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { dishId, quantity }];
      }
    });
    setSuccess(`${quantity} items added to cart.`);
  };

  const removeFromCart = (dishId: string) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.some((item) => item.dishId === dishId);
      if (!itemExists) {
        setError("Item not found in cart.");
        return prevItems; // Prevent state update if item not found
      }
      setSuccess("Item removed from cart.");
      return prevItems.filter((item) => item.dishId !== dishId);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setSuccess("Cart cleared");
  };

  const createOrderFromCart = async (
    token: string,
    time: Date,
    userId: string
  ): Promise<Order | null> => {
    try {
      const order = await createOrder(
        token,
        time,
        "Pending",
        userId,
        cartItems // Pass the cartItems array directly
      );
      clearCart();
      setSuccess("Order successfully created!");
      return order;
    } catch (err) {
      console.error("Error creating order:", err);
      setError("Error creating order. Please try again.");
      return null;
    }
  };

  const clearError = () => {
    setError(null);
  };

  const clearSuccess = () => {
    setSuccess(null);
  };

  const clearInfo = () => {
    setInfo(null);
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    createOrderFromCart,
    error,
    success,
    info,
    setError,
    setSuccess,
    setInfo,
    clearSuccess,
    clearInfo,
    clearError,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartToastManager />
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
