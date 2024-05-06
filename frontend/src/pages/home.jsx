import React,{ useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import LaptopsImg from "../assets/laptops.webp"
import MobilesImg from "../assets/smartphones.webp"
import HomePageImage from "../assets/HomePageAd.png"
import { Carousel } from "@material-tailwind/react";
import { FaArrowRight } from "react-icons/fa";
import { MdElectricBolt } from "react-icons/md";
import {GiProcessor} from "react-icons/gi";
function CarouselTransition() {
    return (
      <Carousel autoplay={true} loop={true} transition={{ duration: 1 }}>
        <img
          src={laptopad}
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <img
          src={laptopad}
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <img
          src={laptopad}
          alt="image 3"
          className="h-full w-full object-cover"
        />
      </Carousel>
    );
}
const Home=(props)=>{
    const [allProducts,setAllProducts]=useState(false);
    const [viewLaptop,setViewLaptop]=useState(false);
    const [viewMobile,setViewMobile]=useState(false);
    const [sort,setSort]=useState("Relevance");
    async function fetch_allProducts(){
        fetch("/api/products/all").then(res=>res.json()).then(data=>{console.log(data.products);setAllProducts(data.products);})
    }
    useEffect(()=>{
        setTimeout(()=>fetch_allProducts(),3000);
    },[]);
    useEffect(()=>{},[sort]);
    function sortedResults(e){
        setSort(e.target.value);
        if(e.target.value==="Popularity"){
            allProducts.sort((a,b)=>b.order_count-a.order_count);
        } else if(e.target.value==="Price- High to Low"){
            allProducts.sort((a,b)=>b.price-a.price);
        } else if(e.target.value==="Price- Low to High"){
            allProducts.sort((a,b)=>a.price-b.price);
        } else if(e.target.value==="Relevance"){
            allProducts.sort((a,b)=>a.product_id-b.product_id);
        }
    }
    if (allProducts===false) {
        return (
            <div className="fixed -top-0 z-20 bg-white text-5xl w-screen h-screen flex justify-center align-middle items-center font-['Papyrus']">
                <GiProcessor className="text-yellow-700 animate-fade text-[80px] mr-4"/><p className="animate-fade">ElectroMart</p>
            </div>
        );
    }
    return (
        <div className=" bg-gradient-to-b from-blue-50 to-blue-400">  
            <div className="w-full mx-autoflex justify-between">
            <img src={HomePageImage}></img>
            </div>
            <p className="text-3xl font-semibold text-center my-4">Browse Categories</p>
            <section className="flex border gap-x-2 px-2 w-full max-h">
                <Link className="relative w-1/2" onMouseOver={()=>setViewLaptop(true)} onMouseOut={()=>setViewLaptop(false)} to={"/laptops"}>
                    {viewLaptop?<p className={`absolute text-3xl w-full h-full bg-black text-white font-bold text-opacity-100 bg-opacity-60 flex justify-center items-center transition-all ease-in`}><p className="animate-fade">Laptops</p><FaArrowRight className="ml-2 animate-fade"/></p>:""}
                    <img src={LaptopsImg} className="object-cover w-full h-full"/>
                </Link>
                <Link className="relative w-1/2" onMouseOver={()=>setViewMobile(true)} onMouseOut={()=>setViewMobile(false)} to={"/mobiles"}>
                    {viewMobile?<p className={`absolute text-3xl w-full h-full bg-black text-white font-bold text-opacity-100 bg-opacity-60 flex justify-center items-center transition-all ease-in`}><p className="animate-fade">Mobiles</p><FaArrowRight className="ml-2 animate-fade"/></p>:""}
                    <img src={MobilesImg} className=""/>
                </Link>
            </section>
            <section className="py-20">
            <div className="container mx-auto">
            <h1 className="text-3xl font-semibold mb-10 text-center">Explore Our Products</h1>
            <div className='flex justify-between '>
            <p className='mb-3'>Showing 1-{allProducts.length} products</p>
            <div className='flex justify-center items-center'>
                <p>Sort by</p>
                <select defaultValue={"Relevance"} onChange={(e)=>{sortedResults(e)}} className='bg-white ml-1 rounded p-1'>
                    <option>Newest first</option>
                    <option>Popularity</option>
                    <option>Price- High to Low</option>
                    <option>Price- Low to High</option>
                </select>
            </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
               {allProducts.map((product,i) => {
                return (
                    <Product product={product} key={product.product_id}  cart={props.cart} setCart={props.setCart}/>
                );
                })}
            </div>
            </div>
            </section>
        </div>
    )
}
export default Home;