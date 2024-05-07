import React, { useState, useEffect } from 'react';
import Product from '../components/Product';
const SearchPage = (props) => {
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState('');
    const [sort,setSort]=useState("Newest first");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/search/'+query);
                const data = await response.json();
                setSearchResults(data.products);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        if (query) {
            fetchData();
        }
    }, [query]);

    const handleSearch = (event) => {
        event.preventDefault();
        // Get the search query from the user input
        const userInput = event.target.elements.searchQuery.value;
        setQuery(userInput);
    };
    
    useEffect(()=>{},[sort]);
    function sortedResults(e){
        setSort(e.target.value);
        if(e.target.value==="Popularity"){
            searchResults.sort((a,b)=>b.order_count-a.order_count);
        } else if(e.target.value==="Price- High to Low"){
            searchResults.sort((a,b)=>b.price-a.price);
        } else if(e.target.value==="Price- Low to High"){
            searchResults.sort((a,b)=>a.price-b.price);
        } else if(e.target.value==="Newest first"){
            searchResults.sort((a,b)=>a.product_id-b.product_id);
        }
    }
    return (
        <div className='bg-gradient-to-b from-blue-50 to-blue-400 animate-fade'>
        <form onSubmit={handleSearch}>
                <input type="text" name="searchQuery" placeholder="Enter your search query" />
                <button type="submit">Search</button>
        </form>
        <section className="py-20">
            <div className="container mx-auto">
            <h1 className="text-3xl font-semibold mb-10 text-center">Explore Our Products</h1>
            <div className='flex justify-between mb-7'>
            {searchResults.length>0?<p>Showing 1-{searchResults.length} products</p>:"No products found"}
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
               {searchResults.map((product,i) => {
                return (
                    <Product product={product} key={product.product_id} cart={props.cart} setCart={props.setCart}/>
                );
                })}
            </div>
            </div>
            </section>
        </div>
    );
};

export default SearchPage;