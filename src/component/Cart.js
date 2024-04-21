import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { NavLink } from 'react-router-dom';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';

function Cart(props) {

  const { cart, products, increment, removeFromCart,  removeProducts } = useContext(ShopContext);
  const [total, setTotal] = useState(0)

  const calculateTotal = () => {
  let newTotal = 0;
  products.forEach((product) => {
    const price = parseFloat(product.price);
    const quantity = parseInt(cart[product.id]);
    if (!isNaN(price) && !isNaN(quantity)) {
      newTotal += price * quantity;
    }
  });
  setTotal(newTotal.toFixed(2));
};

  useEffect(()=>{
    calculateTotal();
  }, [cart, products])

  const addItem = (productId) => {
    increment(productId);
  };

  const removeItem = (productId) => {
    removeFromCart(productId);
  };

  const removeProduct = (productId) => {
    removeProducts(productId);
  };

  const cartProducts = products.filter((product) => cart[product.id] > 0);  // const quantity = cart[product];
  return (
    <div className='bg-black text-white absolute w-64 h-80 overflow-y-auto rounded top-14 right-0 z-10 p-4'>
      <h2 className='flex justify-left text-sm font-medium'>Your Cart</h2>
      {cartProducts.length > 0 ? (
        <div>
        {cartProducts.map((product) => (
          <div key={product.id} className='flex gap-6 mt-3 mb-5'>
            <div className='bg-white rounded-lg p-2 shadow-md object-contain h-16'>
              <img src={product.image} alt={product.title} className='min-w-10 h-12' />
            </div>
            <div>
              <p className='text-xs sm:text-sm'>{product.title}</p>
              <div className='flex gap-2 items-center mt-2'>
                <p>${product.price}</p>
                <div className='flex gap-2 items-center bg-white text-black rounded p-1'>
                  <FaMinus onClick={()=> removeItem(product.id)} />
                  <p>{cart[product.id]}</p>
                  <FaPlus onClick={()=> addItem(product.id)} />
                </div>
                <FaTrash onClick={()=> removeProduct(product.id)} className='trash text-white'/>
              </div>
            </div>
          </div>
        ))}
        <div className='flex justify-between font-medium text-sm mt-8'>
            <p>Total</p>
            <p>${total}</p>
          </div>
          <div className='flex m-5'>
          <NavLink to='/' onClick={props.toggle} className='bg-white text-black text-sm font-medium rounded w-full p-2 flex justify-center m-auto'>Checkout</NavLink>
          </div>
      </div>
      ) : (
        <div>
        <p className='text-base font-medium flex justify-center mt-5 mb-3'>Cart is Empty!</p>
        <NavLink to='/' onClick={props.toggle} className='bg-white text-black text-sm font-medium rounded p-2 flex justify-center m-auto'>Back to home</NavLink>
        </div>
      )
      }
    </div> 
  );
}

export default Cart;
