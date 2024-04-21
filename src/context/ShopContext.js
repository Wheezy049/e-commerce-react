import React, { createContext, useContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);
export const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
        setCart(getDefaultCart(data));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const getDefaultCart = (products) => {
  if (!Array.isArray(products)) {
    console.error("Products is not an array:", products);
    return {};
  }
  const defaultCart = {};
  products.forEach((product) => {
    defaultCart[product.id] = 0;
  });
  return defaultCart;
};


  const [cartItem, setCartItem] = useState(getDefaultCart)
   
    useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItem(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItem));
  }, [cartItem]);

  const addToCart = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: prevCart[productId] ||   + 1
    }));
  };

  const increment = (productId) => {
    setCartItem((prevCart) => ({ ...prevCart, [productId]: prevCart[productId] + 1 }));
  };

  const removeFromCart = (productId) => {
    setCartItem((prevCart) => ({ ...prevCart, [productId]: prevCart[productId] - 1 }));
  };

  const removeAllItems = () => {
    setCartItem(getDefaultCart());
  };

  const value = { products, cart, cartItem, addToCart, increment, removeFromCart, removeAllItems};

  return <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>;
};


export default ShopContextProvider;
