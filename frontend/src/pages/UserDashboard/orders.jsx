import Dashboard from "./dashboard";
import { useState,useEffect } from "react";
import {IoMdClose,IoMdRemove,IoMdAdd} from "react-icons/io"
import { Link } from "react-router-dom";
const Orders=()=>{
const [orders,setOrders]=useState([])
async function get_orders(){
    await fetch("/api/orders").then(res=>res.json()).then(data=>{
        setOrders(data.orders);
    }
    )
}
useEffect(()=>{get_orders()},[]);
function filter_orders(status){
    return orders.filter(order=>order.status===status)
}
return (
<div className="flex">
<div className="hidden md:block"><Dashboard/></div>
<div className="mx-auto px-4 w-full md:w-4/5">
    <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
<div className="flex flex-col md:flex-row gap-4">
{/*orders*/}
<div className="md:w-3/4">
<div className="bg-white rounded-lg shadow-md p-6 mb-4">
    {orders.map((order,i)=>{
        return (                               
        <div key={"ordertitem"+i} className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light">
        <div className="w-full min-h-[150px] flex items-center gap-x-4">
            {/* image */}
            <Link to={`/product/${order.product_id}`}>
            <img className="max-w-[80px] w-10 h-10" src={"/api/image/"+order.product_image} alt="" />
            </Link>
            <div className="w-full flex flex-col">
            {/* title and remove icon */}
            <div className="flex justify-between mb-2">
                {/* title */}
                <Link
                to={`/product/${order.product_id}`}
                className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline"
                >
                {order.order_name}
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
                
                <div className="h-full flex justify-center items-center px-2">
                    {order.quantity}
                </div>
                
                </div>
                {/* final price */}
                <div className="flex flex-1 justify-end items-center text-primary font-medium">{`₹ ${parseFloat(
                order.price * order.quantity
                ).toFixed(2)}`}</div>
                </div>
                </div>
                </div>
                </div>
    )})}
</div>
</div>
<div className="md:w-1/4">

</div>
</div>
</div>
</div>
    )
}

export default Orders;