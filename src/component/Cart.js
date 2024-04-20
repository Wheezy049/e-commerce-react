import React from 'react';
import { useShopContext } from '../context/ShopContext';

function Cart() {
  // Access cart items from the context
  const { cart } = useShopContext();

  // Convert cart object into an array of [productId, quantity] pairs
  const cartItems = Object.entries(cart);

  return (
    <div>
      <h2>Cart Items</h2>
      <ul>
        {/* Map through cartItems array and render each item */}
        {cartItems.map(([productId, quantity]) => (
          <li key={productId}>
            Product ID: {productId}, Quantity: {quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
