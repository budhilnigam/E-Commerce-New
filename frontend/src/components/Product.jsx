import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {FaHeart} from "react-icons/fa"
import { BsPlus, BsEyeFill } from "react-icons/bs";
import LaptopImg from "../assets/logom.webp"
import { Button, Tooltip,Typography } from "@material-tailwind/react";
const Product = (props) => {
  const cart=props.cart;
  const setCart=props.setCart;
  // destructure product
  const { product_id,product_image,specs, category_name, product_name, price, mrp,stock} = props.product;
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
  return (
  <>
    {/*<div className="border border-gray-400 rounded">
      <div className="border-b-2 h-[300px] mb-4 relative overflow-hidden group transition rounded-xl">
        <div className="w-full h-full flex justify-center items-center">
          
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <img
              className="max-h-[160px] group-hover:scale-110 transition duration-300 -order-10"
              src={"/api/image/"+product_image}
              alt="hell"
            />
          </div>
        </div>
        
        <div className="absolute top-6 -right-1 group-hover:right-5 p-2 flex opacity-0 flex-col justify-center items-center gap-y-2 group-hover:opacity-100 transition-all duration-300 w-0 group-hover:w-fit z-30">
        <Tooltip className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
      content={<div className="w-max"><Typography color="blue-gray" className="font-medium">Add to Cart</Typography></div>} placement="right">
        <button onClick={()=>{cart_add(product_id);setCart(!cart);}}>
            <div className="flex justify-center items-center text-white w-12 h-12 bg-teal-500">
              <BsPlus className="text-3xl" />
            </div>
        </button>
        </Tooltip>
        <Tooltip className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
      content={<div className="w-max"><Typography color="blue-gray" className="font-medium">View</Typography></div>} placement="right">
          <Link
            to={`/product/${product_id}`}
            className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
          >
            <BsEyeFill />
          </Link>
        </Tooltip>
        <Tooltip className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
        content={<div className="w-max"><Typography color="blue-gray" className="font-medium">Add to Wislist</Typography></div>} placement="right">
          <button onClick={()=>console.log("Wishlisted")}>
            <div className="flex justify-center items-center text-white w-12 h-12 bg-red-500">
              <FaHeart className="text-2xl" />
            </div>
          </button>
        </Tooltip>
        </div>
      </div>
      
      <div>
        <div className="text-sm capitalize text-gray-500 mb-1">{category_name}</div>
        <Link to={`/product/${product_id}`}>
          <h2 className="font-semibold mb-1">{product_name}</h2>
        </Link>

        <h2 className="font-semibbold">₹ {price}</h2>
      </div>
    </div>*/}
    <div className="flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
    <Link to={`/product/${product_id}`} className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl max-h-52">
    <img
      src={"/api/image/"+product_image}
      alt="card-image" className=" object-contain w-full h-full" />
    </Link>
    <Link className="p-6" to={`/product/${product_id}`}>
    <div className="flex items-center justify-between mb-2">
      <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
        {product_name}
      </p>
      <div className="flex font-sans font-medium leading-relaxed text-blue-gray-900">
        <p className=" text-green-800 font-bold">₹{price}</p>
        <p className="ml-1 text-[12px] text-gray-700 line-through self-center">₹{mrp}</p>
      </div>
    </div>
    <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
      {specs}
    </p>
    </Link>
  <div className="p-6 pt-0">
    <button
      className={`align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
      type="button ${stock>0?"":"pointer-events-none"}`} onClick={()=>{cart_add(product_id);setCart(!cart);}}>
      {stock>0?"Add to Cart":"Out of Stock"}
    </button>
  </div>
  </div>
  </>
  );
};

export default Product;