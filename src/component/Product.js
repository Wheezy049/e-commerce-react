import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

function Product() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const [compoundMounted, setCompoundMounted] = useState(true); // Use state to track component mounting

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      if (compoundMounted) {
        const jsonData = await response.json();
        setData(jsonData);
        setFilter(jsonData);
        setLoading(false); // Set loading to false after fetching and setting data
      }

      return () => {
        setCompoundMounted(false);
      };
    };

    getProducts();
  }, [compoundMounted]); // Add compoundMounted as dependency

  const filterProduct = (item) =>{
     const updatedItem = data.filter((x) => x.category === item);
     setFilter(() => updatedItem);
  }

  const Loading = () => {
    return (
      <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} height={350} />
        ))}
      </div>
    );
  };

  const ShowProducts = () => {
    return (
      <>
        <div className='flex gap-4 justify-center m-auto'>
          <button className='btn' onClick={() => setFilter(data)}>All Product</button>
          <button className='btn' onClick={()=> filterProduct("men's clothing")}>Men`s Clothing</button>
          <button className='btn' onClick={()=> filterProduct("women's clothing")}>Women`s Clothing</button>
          <button className='btn' onClick={()=> filterProduct("jewelery")}>Jewelries</button>
          <button className='btn' onClick={()=> filterProduct("electronics")}>Electronics</button>
        </div>
        <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {filter.map((product) => (
            <div className='bg-white rounded-lg p-4 shadow-md' key={product.id}>
              <img src={product.image} alt={product.title} className='w-full' />
              <p className='text-sm font-medium mt-2'>{product.title.substring(0, 15)}</p>
              <p className='text-sm'>{product.price}</p>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className='container mx-auto px-4'>
      <div className='flex justify-center text-center my-4'>
        <h1 className='text-3xl font-semibold'>Latest Products</h1>
      </div>
      <div className='mt-4'>
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
}

export default Product;
