import mobilead from '../assets/phonebanner.jpg'
import { useState,useEffect } from 'react';
import Product from '../components/Product';
import { Carousel } from "@material-tailwind/react";
function CarouselTransition() {
    return (
      <Carousel autoplay={true} loop={true} transition={{ duration: 1 }}>
        <img
          src={mobilead}
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <img
          src={mobilead}
          alt="image 2"
          className="h-full w-full object-cover"
        />
        <img
          src={mobilead}
          alt="image 3"
          className="h-full w-full object-cover"
        />
      </Carousel>
    );
}
const Mobiles=(props)=>{
    const [allProducts,setAllProducts]=useState([]);
    const [sort,setSort]=useState("Relevance");
    async function fetch_allProducts(){
        fetch("/api/products/mobiles").then(res=>res.json()).then(data=>{console.log(data.products);setAllProducts(data.products);})
    }
    useEffect(()=>{
        fetch_allProducts()
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
    return (
        <div className='bg-gradient-to-b from-blue-50 to-blue-400'>
        <CarouselTransition/>
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
                if (i<10){
                return (
                    <Product product={product} key={product.product_id} cart={props.cart} setCart={props.setCart}/>
                );
                }
                })}
            </div>
            </div>
            </section>
        </div>
    )
}

export default Mobiles;