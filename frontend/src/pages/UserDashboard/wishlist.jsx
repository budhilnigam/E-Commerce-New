import Dashboard from "./dashboard";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { IoMdClose } from "react-icons/io";
const Wishlist=()=>{
const [wishlist,setWishlist]=useState(false)
async function get_wishlist(){
    await fetch("/api/wishlist").then(res=>res.json()).then(data=>{
        setWishlist(data.wishlist);
    }
    )
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
    useEffect(()=>{get_wishlist()},[]);
    if (!wishlist) {
        return(
        <div className=" h-screen w-screen bg-gray-800 fixed -top-0 z-20 opacity-50 text-5xl text-opacity-100 text-center justify-center items-center flex flex-col">
        <div role="status" className="">
        <svg aria-hidden="true" className="w-16 h-16 text-transparent animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        </div>
        </div>);
    } else if (wishlist.length === 0) {
        return (
            <div className="flex">
            <div className="hidden md:block"><Dashboard/></div>
            <div className="mx-auto px-4 w-full md:w-4/5 mt-5">
                <h1 className="text-2xl font-semibold mb-4">Your Wishlist is empty...<Link to={"/"} className="text-blue-500">Shop Now !</Link></h1>
            </div>
            </div>
        )
    }
    return (
        <div className="flex">
        <div className="hidden md:block"><Dashboard/></div>
        <div className="mx-auto px-4 w-full md:w-4/5">
            <h1 className="text-2xl font-semibold mb-4">Your Wishlist</h1>
        <div className="flex flex-col md:flex-row gap-4">
        {/*Products*/}
        <div className="md:w-3/4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            {wishlist.map((product,i)=>{
                return (                               
                <div key={"wishlistitem"+i} className={`${product.stock==0?"opacity-50":"opacity-100"} flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light`}>
                <div className="w-full min-h-[150px] flex items-center gap-x-4">
                    {/* image */}
                    <Link to={`/product/${product.product_id}`}>
                    <img className="max-w-[180px] max-h-[100px]" src={"/api/image/"+product.product_image} alt="" />
                    </Link>
                    <div className="w-full flex flex-col">
                    {/* title and remove icon */}
                    <div className="flex justify-between mb-2">
                        {/* title */}
                        <Link to={`/product/${product.product_id}`}>
                        <p className="text-md font-medium">{product.product_name}</p>
                        <span className="flex">
                        <p className="text-sm text-gray-800 text-nowrap overflow-x-hidden max-w-72 border">{product.specs}</p>
                        <p className="text-sm text-gray-800">...</p>
                        </span>
                        <p className="text-sm text-gray-800">Seller: {product.seller_name}</p>
                        </Link>
                        {/* remove icon */}
                        <div
                        onClick={() => null}
                        className="text-xl cursor-pointer"
                        >
                        <IoMdClose onClick={()=>{wishlist_delete(product.product_id,'all');window.location.reload();}} className="text-gray-500 hover:text-red-500 transition" />
                        </div>
                    </div>
                    <div className="flex gap-x-2 h-[36px] text-sm">
                        {/* quantity */}
                        {product.stock!=0?"":<p className="text-red-400">Out of stock</p>}
                        {/* item price */}
                        <div className="flex flex-1 justify-around items-center">
                        ₹ {product.price}
                        </div>
                    </div>
                    </div>
                    </div>
                    </div>
                )
                }
                )
            }
        </div>
        </div>
        </div>
        </div>
    </div>
    )
}

export default Wishlist;