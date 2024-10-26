import React, { createContext, useContext, useState } from 'react';


const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.size === item.size
      );

      if (existingItemIndex !== -1) {
        
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      }

      
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const clearCart = () => {
    setCartItems([]); 
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (typeof item.price === 'number' ? item.price * item.quantity : 0);
    }, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => {
  return useContext(CartContext);
};
