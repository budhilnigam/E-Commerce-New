import Dashboard from "./dashboard";
import { useState,useEffect } from "react";
import {IoMdClose,IoMdRemove,IoMdAdd} from "react-icons/io"
import { Link } from "react-router-dom";
import AddressForm from "../../components/AddressForm";
const Cart=()=>{
const [cart,setCart]=useState([])
async function get_cart(){
    await fetch("/api/cart").then(res=>res.json()).then(data=>{
        setCart(data.cart);
    }
    )
}
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
async function cart_less(p_id,q){
    const details = { "product_id":p_id};
    const response = await fetch("/api/cart/less/"+q, {
        method: "DELETE",
        headers: {
        'Content-Type' : 'application/json'
        },
        body: JSON.stringify(details)
        }).then((res)=>res.json(),(rej)=>rej.json()).then((data)=>{
            console.log(data.message);
        })
}
async function place_order(p_id,price,qty){
    let orderMessage="";
    const details = {"product_id":p_id,"price":price,"quantity":qty};
    const response = await fetch("/api/order", {
        method: "POST",
        headers: {
        'Content-Type' : 'application/json'
        },
        body: JSON.stringify(details)
        }).then((res)=>res.json(),(rej)=>rej.json()).then((data)=>{
           orderMessage=data.message;
        })
    return orderMessage;
}
const [userDetails,setUserDetails]=useState({})
async function get_address(){
    await fetch("/api/dashboard/aboutuser").then(res=>res.json()).then(data=>{
        console.log(data)
        if(data.line1!=null){
            setUserDetails(data);
        }
    })
}
useEffect(()=>{get_address()},[]);
useEffect(()=>{get_cart()},[]);
function getTotalCost(total,obj){
    return total+obj.price*obj.quantity;
}
function product_order(){
    for(const i in cart){
        console.log(i)
        message=place_order(cart[i].product_id,cart[i].quantity*cart[i].price,cart[i].quantity);
    }
}
const [line1,setLine1]=useState(userDetails.line1);
const [line2,setLine2]=useState(userDetails.line2);
const [state,setState]=useState(userDetails.state);
const [city,setCity]=useState(userDetails.city);
const [pincode,setPincode]=useState(userDetails.line1);
const [primary,setPrimary]=useState(false);
if (props.type=='Change address'){
    useEffect(()=>{fetch("/api/dashboard/aboutuser").then(res=>res.json()).then(data=>{
        setLine1(data.line1);
        setLine2(data.line2);
        setState(data.state);
        setCity(data.city);
        setPincode(data.pincode);
})},[]);}
let total_cost=cart.reduce(getTotalCost,0);
return (
<div className="flex">
<div className="hidden md:block"><Dashboard/></div>
<div className="mx-auto px-4 w-full md:w-4/5">
    <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
<div className="flex flex-col md:flex-row gap-4">
{/*Products*/}
<div className="md:w-3/4">
<div className="bg-white rounded-lg shadow-md p-6 mb-4">
    {cart.map((product,i)=>{
        return (                               
        <div key={"cartitem"+i} className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light">
        <div className="w-full min-h-[150px] flex items-center gap-x-4">
            {/* image */}
            <Link to={`/product/${product.product_id}`}>
            <img className="max-w-[80px] w-10 h-10" src={"/api/image/"+product.product_image} alt="" />
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
                <div onClick={()=>{cart_less(product.product_id,'1');window.location.reload()}} className="h-full flex-1 flex justify-center items-center cursor-pointer">
                    <IoMdRemove />
                </div>
                <div className="h-full flex justify-center items-center px-2">
                    {product.quantity}
                </div>
                <div onClick={()=>{cart_add(product.product_id);window.location.reload();}} className="h-full flex flex-1 justify-center items-center cursor-pointer">
                    <IoMdAdd />
                </div>
                </div>
                {/* item price */}
                <div className="flex flex-1 justify-around items-center">
                ₹ {product.price}
                </div>
                {/* final price */}
                <div className="flex flex-1 justify-end items-center text-primary font-medium">{`₹ ${parseFloat(
                product.price * product.quantity
                ).toFixed(2)}`}</div>
                </div>
                </div>
                </div>
                </div>
    )})}
</div>
<div className="bg-white rounded-lg shadow-md p-6 mb-4">
{userDetails.line1!=null?<div>
Deliver at {userDetails.line1}<br/>
                    {userDetails.line2!=null?userDetails.line2+"<br>":""}
                    {userDetails.city}<br/>
                    {userDetails.state}<br/>
                    Pincode: {userDetails.pincode}
                    {<AddressForm type="Change address"/>}</div>
:<AddressForm type="Add address"/>}
</div>
</div>
<div className="md:w-1/4">
<div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-lg font-semibold mb-4">Summary</h2>
    <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>₹{total_cost}</span>
    </div>
    <div className="flex justify-between mb-2">
        <span>Taxes </span>
        <span>₹{total_cost*0.18}</span>
    </div>
    <div className="flex justify-between mb-2">
        <span>Shipping</span>
        <span>₹0.00</span>
    </div>
    <hr className="my-2"/>
    <div className="flex justify-between mb-2">
        <span className="font-semibold">Total</span>
        <span className="font-semibold">₹ {total_cost*1.18}</span>
    </div>
        <button onClick={()=>{product_order();}} className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button>
    </div>
    </div>
</div>
</div>
</div>
    )
}

export default Cart;