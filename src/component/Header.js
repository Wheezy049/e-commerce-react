import React, {useContext, useState} from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import Cart from './Cart';
import { ShopContext } from '../context/ShopContext';
import { NavLink } from 'react-router-dom';

function Header() {

   const { cart } = useContext(ShopContext)

   const [isCartOpen, setIsCartOpen] = useState(false);

   const toggleCart = () => {
    // e.preventDefault()
    setIsCartOpen(!isCartOpen);
  };

  const totalUniqueItems = Object.keys(cart).filter(productId => cart[productId] > 0).length;

  return (
    <div className='flex bg-black px-8 py-4 justify-between items-center text-white'>
     <NavLink to='/' onClick={toggleCart} className='text-base sm:text-2xl font-medium uppercase'>Shopping Store</NavLink>
     <div className='gap-2 hidden sm:flex'>
     <input type='text' className='text-black text-sm' />
     <button className='border border-solid border-white rounded text-sm font-medium p-2 hover:bg-white hover:text-black'>Search</button>
     </div>
     <div className='flex text-sm font-medium gap-1 items-center relative'>
     <FaShoppingCart onClick={toggleCart}/>
     {isCartOpen && <Cart toggle={toggleCart}/>}
     <p>({totalUniqueItems})</p>
     </div>
    </div>
  )
}

export default Header