import React,{ useState,useEffect } from "react";
import Product from "../components/Product";
import HomePageImage from "../assets/HomePageAd.png"
const Home=()=>{
    const [allProducts,setAllProducts]=useState([]);
    async function fetch_allProducts(){
        fetch("/api/products/all").then(res=>res.json()).then(data=>{console.log(data.products);setAllProducts(data.products);})
    }
    useEffect(()=>{
        fetch_allProducts();
    },[]);
    return (
        <div className="-mt-10 ">  
            <div className="w-full mx-autoflex justify-between">
            <img src={HomePageImage}></img>
            </div>
            <section className="py-20">
            <div className="container mx-auto">
            <h1 className="text-3xl font-semibold mb-10 text-center">Explore Our Products</h1>
            <p>Showing 1-10 products</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
               {allProducts.map((product,i) => {
                if (i<10){
                return (
                    <Product product={product} key={product.product_id}/>
                );
                }
                })}
            </div>
            </div>
            </section>
        </div>
    )
}
export default Home;