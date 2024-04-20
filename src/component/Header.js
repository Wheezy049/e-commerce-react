import React from 'react'
import { FaShoppingCart } from 'react-icons/fa';

function Header() {
  return (
    <div className='flex bg-black px-8 py-4 justify-between items-center text-white'>
     <h1 className='text-2xl font-medium uppercase'>Shopping Store</h1>
     <div className='gap-2 hidden sm:flex'>
     <input type='text' className='text-black text-sm' />
     <button className='border border-solid border-white rounded text-sm font-medium p-2 hover:bg-white hover:text-black'>Search</button>
     </div>
     <div className='flex text-sm font-medium gap-1 items-center'>
     <FaShoppingCart />
     <p>(0)</p>
     </div>
    </div>
  )
}

export default Header