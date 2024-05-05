import React, { useEffect, useState } from "react";
import { FaHeart,FaShoppingCart, FaCheck,FaArrowRight } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import LaptopImg from "../assets/logom.webp"
const ProductDetails = (props) => {
  const { id } = useParams();
  const cart=props.cart;
  const setCart=props.setCart;
  const [productDetails,setProductDetails]=useState({});
  const [added,setAdded]=useState(false);
  const [wishlisted,setWishlisted]=useState(false);
  const [error,setError]=useState("");
  useEffect(()=>{
        fetch("/api/product/"+id).then(res=>res.json(),rej=>rej.json()).then(data=>{setProductDetails(data.details);setAdded(data.added),setWishlisted(data.wishlisted);},mssg=>setError(mssg.message));
  },[]);
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
  async function wishlist_add(p_id){
    const details = { "product_id":p_id};
    const response = await fetch("/api/wishlist/add", {
        method: "POST",
        headers: {
        'Content-Type' : 'application/json'
        },
        body: JSON.stringify(details)
        }).then((res)=>res.json(),(rej)=>rej.json()).then((data)=>{
            console.log(data.message);
        })
}
async function wishlist_delete(p_id){
  const details = { "product_id":p_id};
  const response = await fetch("/api/wishlist/delete", {
      method: "DELETE",
      headers: {
      'Content-Type' : 'application/json'
      },
      body: JSON.stringify(details)
      }).then((res)=>res.json(),(rej)=>rej.json()).then((data)=>{
          console.log(data.message);
      })
}
  if (error!="") {
    return (
      <section className="h-screen flex justify-center items-center">
        {error}
      </section>
    );
  }

  // destructure product
  const {product_id, product_name, price, specs, product_image,mrp,stock,brand,seller_name } = productDetails;
  return (
    <section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 flex items-center">
      <div className="container mx-auto border rounded-3xl shadow-lg">
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
            <div className="text-2xl text-green-600 font-medium mb-6">₹{price}<p className="text-[18px] text-gray-600 line-through">₹{mrp}</p></div>
            </div>
            <ul className="items-start w-max mx-auto md:mx-1 flex flex-col text-gray-600 overflow-x-auto justify-center justify-items-center">  
              <li><p className="mb-2">{specs}</p></li>
              <li><p>Brand: {brand}</p></li>
              <li><p>Seller: {seller_name}</p></li>
              {stock>0&&stock<10?<li><p className="text-red-300">Only {stock} available !</p></li>:""}
            </ul>
            <span className="flex gap-x-3 my-4">
                {stock>0?added==0?<button className='bg-teal-500 py-4 px-8 text-white flex justify-center items-center' onClick={()=>{cart_add(product_id);setAdded(true);setCart(!cart)}}>Add to cart<FaShoppingCart className="ml-2"/></button>:<Link to={"/cart"}><button className='bg-teal-500 py-4 px-8 text-white flex justify-center items-center'>Go to cart<FaArrowRight className="ml-2"/></button></Link>:<button className='bg-gray-500 py-4 px-8 text-white flex justify-center items-center'>Out of stock</button>}
                {wishlisted==0?<button className="bg-red-600 py-4 px-8 text-white flex justify-center items-center" onClick={()=>{wishlist_add(product_id);setWishlisted(true)}}>Wishlist<FaHeart className="ml-2"/></button>:<button className="bg-red-600 py-4 px-8 text-white flex justify-center items-center" onClick={()=>{wishlist_delete(product_id);setWishlisted(false)}}>Wishlisted <FaCheck className="ml-2"/></button>}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;