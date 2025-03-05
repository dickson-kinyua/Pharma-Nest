"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);

  //load cart from local storage
  // useEffect(() => {
  //   const savedCart = localStorage.getItem("cartItems");
  //   if (savedCart) {
  //     setCartItems(JSON.parse(savedCart));
  //   }
  // }, []);

  //save cart to locsl storage

  // useEffect(() => {
  //   const savedCart = localStorage.getItem("cartItems");
  //   setCartItems(savedCart ? JSON.parse(savedCart) : []); // Ensures an array
  // }, []);

  const addToCart = (item) => {
    setCartList((prev) => {
      const existingItem = prev.find((i) => i._id === item._id);

      if (existingItem) {
        return prev.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartList((prev) => prev.filter((item) => item._id !== _id));
  };

  const clearCart = () => setCartList([]);

  return (
    <CartContext.Provider
      value={{ cartList, setCartList, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const UserCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a cartProvider");
  }
  return context;
};
