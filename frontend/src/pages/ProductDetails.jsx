import React, { useEffect, useState } from "react";
import { FaHeart,FaShoppingCart, FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import LaptopImg from "../assets/logom.webp"
const ProductDetails = () => {
  const { id } = useParams();
  const [productDetails,setProductDetails]=useState({});
  const [error,setError]=useState("");
  useEffect(()=>{
        fetch("/api/product/"+id).then(res=>res.json(),rej=>rej.json()).then(data=>setProductDetails(data.details),mssg=>setError(mssg.message));
  },[])
  async function cart_add(p_id){
    const details = { "product_id":p_id};
    const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
        'Content-Type' : 'application/json'
        },
        body: JSON.stringify(details)
        }).then((res)=>res.json(),(rej)=>rej.json()).then((data)=>{
            console.log(data.message);
        })
  }
  // if product is not found
  if (error!="") {
    return (
      <section className="h-screen flex justify-center items-center">
        {error}
      </section>
    );
  }

  // destructure product
  const {product_id, product_name, price, specs, product_image,mrp,stock,rating,brand,seller_name } = productDetails;
  return (
    <section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 flex items-center">
      <div className="container mx-auto">
        {/* product_image and text wrapper */}
        <div className="flex flex-col lg:flex-row items-center">
          {/* product_image */}
          <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
            <img className="max-w-[200px] lg:max-w-xs" src={"/api/image/"+product_image} alt="" />
          </div>
          {/* text */}
          <div className="flex-1 px-4 pr-20 text-center lg:text-left">
            <div className="flex justify-between">
            <p className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">{product_name}</p>
            <div className="text-2xl text-red-500 font-medium mb-6">₹{price}<p className="text-[18px] text-gray-600 line-through">₹{mrp}</p></div>
            </div>
            <ul className="items-start w-max mx-auto md:mx-1 list-item list-disc text-gray-600 overflow-x-auto">  
              <li><p className="mb-2">{specs}</p></li>
              <li><p>Brand: {brand}</p></li>
              <li><p>Seller: {seller_name}</p></li>
            </ul>
            <span className="flex gap-x-3 mt-4">
                <button className='bg-teal-500 py-4 px-8 text-white flex justify-center items-center' onClick={()=>{cart_add(product_id);}}>Add to cart<FaShoppingCart className="ml-2"/></button>
                <button className="bg-red-600 py-4 px-8 text-white flex justify-center items-center">Wishlist<FaHeart className="ml-2"/></button>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;