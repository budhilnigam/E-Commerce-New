import Dashboard from "./dashboard";
import { useState,useEffect } from "react";
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
function date_conv(inputDate){
    const date = new Date(inputDate);

    // Get the day, month, and year components from the Date object
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    // Define an array of month names
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Format the date string in the desired format
    const formattedDate = day + ' ' + months[monthIndex] + ' ' + year;

    return formattedDate;
}
return (
<div className="flex">
<div className="hidden md:block"><Dashboard/></div>
<div className="mx-auto px-4 w-full md:w-4/5 mt-5">
    <h1 className="text-2xl font-semibold mb-4">My Orders</h1>
<div className="flex flex-col gap-4">
{/*orders*/}
<div className="w-full">
<div className="bg-white rounded-lg shadow-md p-6 mb-4 overflow-auto">
<table className="w-full border-none" cellPadding={12}>
    <tbody>
    <tr className="">
        <th></th>
        <th className="text-center">Order Date</th>
        <th>Delivery Date</th>
        <th>Delivery Address</th>
        <th>Status</th>
        <th>Amount</th>
    </tr>
    {orders.map((order,i)=>{
        return (                               
        <tr key={"ordertitem"+i} className="md:gap-x-4 py-2 md:px-6 border-b border-gray-200 w-full font-light min-h-[150px] items-center">
            {/* image */}
            <td>
            <Link to={`/product/${order.product_id}`} className="flex">
            <img className="max-w-[50px] max-h-[50px] md:max-w-[100px] md:max-h-[120px] object-contain" src={"/api/image/"+order.product_image} alt="" />
            <div className="flex flex-col ml-4 max-w-16 max-h-48 md:max-w-56 md:max-h-48 overflow-clip">
            <p className="text-lg">{order.product_name}</p>
            <p className="text-sm text-gray-600 max-w-50 overflow-hidden">{order.specs}</p>
            </div>
            </Link>
            </td>
            {/* title */}
                <td className="text-center">
                {date_conv(order.date_order)}
                </td>
                <td className="text-center">
                {date_conv(order.date_delivery)}
                </td>
                <td className="text-start pl-3 pt-1">
                    {order.line1}<br/>
                    {order.line2!=null?<p>{order.line2}<br/></p>:""}
                    {order.city}<br/>
                    {order.state}<br/>
                    {order.pincode}<br/>
                </td>
                <td className={`${order.status=='pending'?"text-yellow-700":order.status=="delivered"?"text-green-700":"text-red-700"} capitalize text-center`}>
                {order.status}
                </td>
                {/* remove icon */}
                <td className="text-center">{`₹ ${parseFloat(
                    order.price*1.18
                    ).toFixed(2)}`}
                </td>
        </tr>
    )})}
    </tbody>
</table>
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