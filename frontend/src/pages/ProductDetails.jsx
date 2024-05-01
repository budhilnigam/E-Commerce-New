import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";
import LaptopImg from "../assets/logom.webp"
const ProductDetails = () => {
  const { id } = useParams();
  const [productDetails,setProductDetails]=useState({});
  const [error,setError]=useState("");
  useEffect(()=>{
        fetch("/api/product/"+id).then(res=>res.json(),rej=>rej.json()).then(data=>setProductDetails(data.details)).catch((rej)=>{console.log(rej.message);setError(rej.message)});
  },[])

  // if product is not found
  if (error!="") {
    return (
      <section className="h-screen flex justify-center items-center">
        Loading...
      </section>
    );
  }

  // destructure product
  const { product_name, price, specs, product_image,mrp } = productDetails;
  return (
    <section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 h-screen flex items-center">
      <div className="container mx-auto">
        {/* product_image and text wrapper */}
        <div className="flex flex-col lg:flex-row items-center">
          {/* product_image */}
          <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
            <img className="max-w-[200px] lg:max-w-xs" src={LaptopImg} alt="" />
          </div>
          {/* text */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">{product_name}</h1>
            <div className="text-2xl text-red-500 font-medium mb-6">₹ {price}</div>
            <p className="mb-8">{specs}</p>
            <span>
                <button className='bg-black py-4 px-8 text-white'>Add to cart</button>
                <button>Wislist <FaHeart className=" text-red-600"/></button>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;