import React, { useState } from 'react'
import Product from './Product'

function Hero() {

  const [isCartOpen, setIsCartOpen] = useState(true);

   const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div>
     <Product toggle={()=> toggleCart}/>
    </div>
  )
}

export default Hero