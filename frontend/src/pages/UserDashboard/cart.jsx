import Dashboard from "./dashboard";
import { useState,useEffect } from "react";
import {IoMdClose,IoMdRemove,IoMdAdd} from "react-icons/io"
import { Link } from "react-router-dom";
const Cart=()=>{
const [cart,setCart]=useState([])
async function get_cart(){
    await fetch("/api/cart").then(res=>res.json()).then(data=>{
        setCart(data.cart);
    }
    )
}
useEffect(()=>{get_cart()},[])
return (
<div className="flex">
<div className="hidden md:block"><Dashboard/></div>
<div className="mx-auto px-4">
    <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
<div className="flex flex-col md:flex-row gap-4">
{/*Products*/}
<div className="md:w-3/4">
<div className="bg-white rounded-lg shadow-md p-6 mb-4">
    {cart.map((product,i)=>(                               
        <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light">
        <div className="w-full min-h-[150px] flex items-center gap-x-4">
            {/* image */}
            <Link to={`/product/${product.product_id}`}>
            <img className="max-w-[80px]" src={"product.product_image"} alt="" />
            </Link>
            <div className="w-full flex flex-col">
            {/* title and remove icon */}
            <div className="flex justify-between mb-2">
                {/* title */}
                <Link
                to={`/product/${product.product_id}`}
                className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline"
                >
                {product.product_name}
                </Link>
                {/* remove icon */}
                <div
                onClick={() => null}
                className="text-xl cursor-pointer"
                >
                <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
                </div>
            </div>
            <div className="flex gap-x-2 h-[36px] text-sm">
                {/* quantity */}
                <div className="flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium">
                <div onClick={()=>null} className="h-full flex-1 flex justify-center items-center cursor-pointer">
                    <IoMdRemove />
                </div>
                <div className="h-full flex justify-center items-center px-2">
                    {product.quantity}
                </div>
                <div onClick={()=>null} className="h-full flex flex-1 justify-center items-center cursor-pointer">
                    <IoMdAdd />
                </div>
                </div>
                {/* item price */}
                <div className="flex flex-1 justify-around items-center">
                $ {product.price}
                </div>
                {/* final price */}
                <div className="flex flex-1 justify-end items-center text-primary font-medium">{`$ ${parseFloat(
                product.price * product.quantity
                ).toFixed(2)}`}</div>
                </div>
                </div>
                </div>
                </div>
            ))}
</div>
</div>
<div className="md:w-1/4">
<div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-lg font-semibold mb-4">Summary</h2>
    <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>$19.99</span>
    </div>
    <div className="flex justify-between mb-2">
        <span>Taxes</span>
        <span>$1.99</span>
    </div>
    <div className="flex justify-between mb-2">
        <span>Shipping</span>
        <span>$0.00</span>
    </div>
    <hr className="my-2"/>
    <div className="flex justify-between mb-2">
        <span className="font-semibold">Total</span>
        <span className="font-semibold">$21.98</span>
    </div>
    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
</div>
</div>
</div>
</div>
</div>
    )
}

export default Cart;