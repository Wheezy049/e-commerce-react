import React from 'react'
import { FaShoppingCart } from 'react-icons/fa';

function Header() {
  return (
    <div className='flex bg-black px-8 py-4 justify-between items-center text-white'>
     <h1 className=''>Shopping Store</h1>
     <div className='flex gap-4'>
     <input type='text' />
     <button>Search</button>
     </div>
     <FaShoppingCart />
    </div>
  )
}

export default Header