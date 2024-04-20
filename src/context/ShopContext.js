import React, { createContext, useContext, useEffect, useState } from "react";

// Create a context for the shopping cart
const ShopContext = createContext();

// Component to provide the shopping cart context
const ShopContextProvider = (props) => {
  // State to manage the product data
  const [products, setProducts] = useState([]);
  // State to manage the cart
  const [cart, setCart] = useState({});

  // Function to fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
        // Initialize cart with default values
        setCart(getDefaultCart(data));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Function to initialize cart with default values
  const getDefaultCart = (products) => {
    const defaultCart = {};
    products.forEach((product) => {
      defaultCart[product.id] = 0;
    });
    return defaultCart;
  };

  // Function to add a product to the cart
  const addToCart = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: prevCart[productId] + 1,
    }));
  };

  // Value to be provided by the context provider
  const value = {
    products,
    cart,
    addToCart,
  };

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};

// Custom hook to consume the shopping cart context
const useShopContext = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShopContext must be used within a ShopContextProvider");
  }
  return context;
};

export { ShopContextProvider, useShopContext };
