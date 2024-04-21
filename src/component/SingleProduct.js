import React, { useContext, useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

function SingleProduct(props) {
 
  const {id} = useParams();
  const [singleProduct, setSingleProduct] = useState({})
  const [loading, setLoading] = useState(false)
  const {addToCart, products} = useContext(ShopContext)

  const handleAddToCart = () => {
    console.log("Product ID:", id); // Log the productId before adding to cart
    addToCart(id);
  };

  useEffect(()=>{
   const getSingleProduct = async () =>{
     setLoading(true);
     const response = await fetch(`https://fakestoreapi.com/products/${id}`)
     const data = await response.json();
     setSingleProduct(data);
     setLoading(false)
   }

   getSingleProduct();

  },[id])

  const Loading = () => {
    return (
      <div className='flex mx-10 gap-40 my-12'>
        <div>
          <Skeleton height={320} width={240} />
        </div>
        <div>
          <Skeleton height={50} width={300} />
          <Skeleton height={75} width={200} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} width={300} />
          <Skeleton height={50} width={300} />
        </div>
      </div>
    );
  };

  const ShowProduct = () =>{
   return(
    <>
      <div className='flex mx-10 gap-40 my-12' key={singleProduct.id}>
       <div className='bg-white rounded-lg p-5 shadow-md'>
          <img src={singleProduct.image} alt={singleProduct.title} className='min-w-60 h-80' />
       </div>
       <div>
         <h4 className='text-black text-base font-medium uppercase opacity-70 mb-2'>{singleProduct.category}</h4>
         <h1 className='text-3xl font-light mb-2'>{singleProduct.title}</h1>
         <div className='flex gap-2 items-center mb-2'>
           <p className='text-sm font-medium'>Rating {singleProduct.rating && singleProduct.rating.rate} </p>
           <FaStar />
         </div>
         <h3 className='text-2xl font-semibold mb-2'>$ {singleProduct.price}</h3>
         <p className='text-base opacity-60 mb-2'>{singleProduct.description}</p>
         <button className='btn' onClick={ handleAddToCart}>Add to cart</button>
       </div>
      </div>
    </>
   )
  }
  
  return (
    <div className='container mx-auto px-4'>
      <div className='mt-4'>
        {loading ? <Loading /> : <ShowProduct />}
      </div>
    </div>
  )
}

export default SingleProduct
