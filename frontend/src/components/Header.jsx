import { Link, Navigate, redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import {MdOutlineClose,MdOutlineSearch} from "react-icons/md";
import { GiProcessor } from "react-icons/gi";
import {FaBars,FaUserCircle,FaPowerOff, FaBoxOpen,FaHeart } from "react-icons/fa"
import {RiArrowDropDownLine} from "react-icons/ri"
import AuthWithForm from "./Authentication";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
  } from "@material-tailwind/react";
  import {
    UserIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
    ShoppingCartIcon
  } from "@heroicons/react/24/solid";

const Navbar = (props) => {
    const userAuth=props.userAuth;
    const setUserAuth=props.setUserAuth;
    const [openNav,setOpenNav]=useState(false);
    const [opensearchbox,setOpensearchbox]=useState(false);
    const [activeLink,setActiveLink]=useState(window.location.pathname);
    const cart=props.cart;
    const setCart=props.setCart;
    function handleLinks(){
        setActiveLink(window.location.pathname);
    }
    const [cartTotal,setCartTotal]=useState(0);
    function cart_count(total,obj){
        return total+obj.quantity
    }
    async function get_cart(){
        await fetch("/api/cart").then(res=>res.json()).then(data=>setCartTotal(data.cart.reduce(cart_count,0)))
        return null;
    }
    useEffect(()=>{
        if(userAuth!==false){
            get_cart();
        }
    },[cart]);
    const [profileDropdown,setProfiledropdown]=useState(false);
    const query=props.query;
    const setQuery=props.setQuery;
    const navItems = [
        {
            name: "Home",
            url: "/",
        },
        {
            name: "Laptops",
            url: "/laptops",
        },
        {
            name: "Mobiles",
            url: "/mobiles",
        },
    ]
    const handleSearch = (event) => {
        setQuery(event.target.value);
    };
    function handleEnter(e){
        if(e.keyCode=='13'){
            console.log("Enter");
            redirect("/search");
        }
    }
    let timeout;
    return (
        <header className=" sticky top-0 z-10">
        {!opensearchbox?<nav className="bg-gray-100 shadow-xl px-4 md:px-16 w-full top-0 h-28">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl text-2xl my-auto h-full ">
                <Link to="/" className="flex flex-row items-center">
                    <GiProcessor onClick={()=>setActiveLink("/")} style={{"fontFamily":"Papyrus"}} className="mr-1 text-yellow-700 text-4xl" alt="Logo" />
                    <div onClick={()=>setActiveLink("/")} style={{"fontFamily":"Papyrus"}}>ElectroMart</div>
                </Link>
                <div className="flex md:hidden items-center md:order-2">
                    <button className="p-2 ml-1 text-2xl rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 z-10" onClick={()=>setOpensearchbox(true)}>
                    <MdOutlineSearch/>
                    </button>
                    <button className="p-2 ml-1 text-xl rounded-md md:hidden
                     focus:outline-none focus:ring-2 focus:ring-gray-200 z-10 ">
                        {!openNav ? <FaBars  onClick={()=>setOpenNav(true)} /> : <MdOutlineClose onClick={()=>{setOpenNav(false)}}/>}
                    </button>
                </div>
                <div className="hidden md:block relative w-1/3 ">
                    <MdOutlineSearch className="absolute top-2.5 left-2 text-gray-600 text-[20px]"/>
                    <Link to={"/search"}><button className="absolute text-[16px] right-0 top-0 h-full bg-gray-400 p-0.5 px-2 border border-gray-700 rounded-r-md">Search</button></Link>
                    <input type="text" onChange={(e)=>{handleSearch(e)}} value={query} className="text-[16px] px-2 py-1 pl-8 rounded-lg w-full bg-gray-200 border border-gray-700" placeholder="Search..."></input>
                    </div>
                <div className={`${openNav ? "right-0" : "-right-[100%]"} top-0 border border-l-gray-400 md:border-none bg-gray-100 md:bg-none
                 transition-all duration-300 md:h-auto h-full shadow-xl md:shadow-none fixed md:static md:justify-between items-center w-[50%]
                  flex-col md:items-center md:flex-row flex md:w-auto md:order-1 md:space-x-8 space-y-6 md:space-y-0 pt-8 md:pt-0`}>
                    <ul className="flex flex-col items-center space-y-5 md:space-y-0 font-medium md:flex-row md:space-x-8 mt-20 md:mt-0">
                    
                        {navItems.map((item, index) => {
                            return (
                                <li key={index} onClick={()=>handleLinks()}>
                                    <Link to={item.url} className={`${item.url === activeLink && "text-purple-300 "} hover:text-purple-300 transition-all duration-300
                                     relative after:w-0 hover:after:w-[100%] after:h-[2px] after:transition-all after:duration-300 after:bg-red-300 
                                     after:absolute after:-bottom-1 after:left-0`}>{item.name}</Link>
                                </li>
                            )
                        })}
                    {userAuth===false?<AuthWithForm userAuth={userAuth} setUserAuth={setUserAuth}/>:
                    <>
                    <span className="bg-black w-1/2 h-[1px] md:hidden"></span>
                    <div className="relative md:w-16 md:h-10  justify-center align-middle items-center flex">    
                    <div onClick={()=>{setProfiledropdown(!profileDropdown)}} className={`flex w-16 rounded-3xl ${profileDropdown?"border border-black":""} p-1 justify-center items-center h-max hover:cursor-pointer`}>
                    <FaUserCircle className="hidden md:block mx-auto text-gray-700 w-28 h-8 "/>
                    <RiArrowDropDownLine className="hidden md:block w-28"/>
                    </div>
                    <List className={`md:${profileDropdown?"visible":"hidden"} md:top-20 md:-right-4 md:absolute md:bg-gray-50 md:shadow-xl md:text-baseline md:text-blue-gray-700 text-[20px] md:px-2 md:rounded md:border `}>
                        <a href="/profile">
                        <ListItem onClick={()=>{handleLinks();}}>
                        <ListItemPrefix>
                            <UserCircleIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Profile
                        </ListItem>
                        </a>
                        <a href="/cart">
                        <ListItem onClick={()=>{handleLinks();}}>
                        <ListItemPrefix>
                            <ShoppingCartIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        My Cart
                        </ListItem>
                        </a>
                        <a href="/orders">
                        <ListItem onClick={()=>{handleLinks();}}>
                        <ListItemPrefix>
                            <FaBoxOpen className="h-5 w-5" />
                        </ListItemPrefix>
                        My Orders
                        </ListItem>
                        </a>
                        <a href="/wishlist">
                        <ListItem onClick={()=>{handleLinks();}}>
                        <ListItemPrefix>
                            <FaHeart className="h-5 w-5" />
                        </ListItemPrefix>
                        My Wislist
                        </ListItem>
                        </a>
                        <a onClick={()=>{
                            setActiveLink("/");
                        fetch("/api/user/logout",{method: "GET"}).then(
                            (res)=>res.json(),
                            (rej)=>rej).then(
                                (data)=>{console.log(data.message)}
                            );setUserAuth(false);}} href="/">
                        <ListItem>
                        <ListItemPrefix>
                            <PowerIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Log Out
                        </ListItem>
                        </a>
                    </List>
                    </div>
                    <div onClick={()=>handleLinks()} className="relative md:flex hidden md:-left-2">
                    <Link to={"/cart"}>
                    <ShoppingCartIcon className="h-8 w-10 text-gray-800"/>
                    <section className=" absolute left-4 bottom-4 bg-red-500 text-gray-100 rounded-xl text-[12px] w-[18px] h-[18px] flex justify-center items-center ">{cartTotal}</section>
                    </Link>
                    </div>
                    </>}
                    </ul>
                </div>
            </div>
        </nav>:
        <div className="absolute top-0 left-0 w-full">
            <div className="absolute w-full bg-gray-100 bg-opacity-100 h-20 left-0 top-0 border-b border-b-gray-400 justify-center items-center flex z-20">
                <div className="relative mx-auto w-5/6">
                    <MdOutlineSearch className="absolute top-2.5 left-2 text-gray-600 text-[20px]"/>
                    <Link to={"/search"}><button className="absolute text-[16px] right-0 top-0 h-full bg-gray-400 p-0.5 px-2 border border-gray-700 rounded-r-md">Search</button></Link>
                    <input type="text" onChange={(e)=>{handleSearch(e)}} value={query} className="text-[16px] px-2 py-1 pl-8 w-full rounded-lg mx-auto bg-gray-300 border border-gray-700 placeholder-gray-600 " placeholder="Search..."></input>
                </div>
            </div>
            <div onClick={()=>{setOpensearchbox(false) }} className="absolute top-20 w-full h-screen bg-black z-30 bg-opacity-50">
            </div>
            <div></div>
        </div>}
    </header>
    );
}
export default Navbar;