import React,{ useState,useEffect } from "react";
import Product from "../components/Product";
const Home=()=>{
    const [allProducts,setAllProducts]=useState([]);
    async function fetch_allProducts(){
        fetch("/api/products").then(res=>res.json()).then(data=>{console.log(data.products);setAllProducts(data.products);})
    }
    useEffect(()=>{
        fetch_allProducts()
    },[]);
    return (
        <>
            <h1>Home</h1>
            <section className="py-20">
            <div className="container mx-auto">
            <h1 className="text-3xl font-semibold mb-10 text-center">Explore Our Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
               {allProducts.map((product) => {
                return (
                    <>
                    <p>Hi</p>
                    <Product product={product} key={product.product_id}/>
                    </>
                );
                })}
            </div>
            </div>
            </section>
        </>
    )
}
export default Home;