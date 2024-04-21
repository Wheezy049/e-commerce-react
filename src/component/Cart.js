import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

function Cart(props) {
  const { cart, products } = useContext(ShopContext);

  const cartProducts = products.filter((product) => cart[product.id] > 0);

  return (
    <div className='bg-black text-white absolute w-56 h-72 rounded top-14 right-0  p-8'>
      <h2>Cart Items</h2>
      {cartProducts.length > 0 ? (
        <ul>
        {cartProducts.map((product) => (
          <li key={product.id} className=''>
            <p>{product.title}</p>
          </li>
        ))}
      </ul>
      ) : (
        <p>Cart is Empty</p>
      )
      }
    </div> 
  );
}

export default Cart;
