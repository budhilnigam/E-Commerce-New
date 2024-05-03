import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {MdElectricBolt,MdOutlineClose} from "react-icons/md";
import {FaBars,FaUserCircle,FaPowerOff, FaBoxOpen,FaHeart } from "react-icons/fa"
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

export const Navbar = (props) => {
    const userAuth=props.userAuth;
    const setUserAuth=props.setUserAuth;
    const [openNav,setOpenNav]=useState(false);
    const [activeLink,setActiveLink]=useState(window.location.pathname);
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
    useEffect(()=>{get_cart()})
    const [profileDropdown,setProfiledropdown]=useState(false);
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
    let timeout;
    return (
        <header className=" sticky top-0 z-10">
        <nav className="bg-gray-100 shadow-xl px-4 md:px-16 w-full top-0 h-28 mb-10">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl text-2xl my-auto h-full ">
                <Link to="/" className="flex flex-row items-center">
                    <MdElectricBolt onClick={()=>setActiveLink("/")} style={{"fontFamily":"Papyrus"}} className="mr-1 text-yellow-700 text-4xl" alt="Logo" />
                    <div onClick={()=>setActiveLink("/")} style={{"fontFamily":"Papyrus"}}>ElectroMart</div>
                </Link>
                <div className="flex md:hidden items-center md:order-2">
                    <button className="p-2 ml-1 text-xl rounded-md md:hidden
                     focus:outline-none focus:ring-2 focus:ring-gray-200 ">
                        {!openNav ? <FaBars  onClick={()=>setOpenNav(true)} /> : <MdOutlineClose onClick={()=>{setOpenNav(false)}}/>}
                    </button>
                </div>
                <div className={`${openNav ? "right-0" : "-right-[100%]"} top-14 border border-l-gray-400 md:border-none bg-gray-100 md:bg-none
                 transition-all duration-300 md:h-auto h-full shadow-xl md:shadow-none fixed md:static md:justify-between items-center w-[50%]
                  flex-col md:items-center md:flex-row flex md:w-auto md:order-1 md:space-x-8 space-y-6 md:space-y-0`}>
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
                    <span className="bg-black w-3/4 h-[1px] md:hidden"></span>
                    <div onMouseOver={()=>setProfiledropdown(true)} onMouseLeave={()=>{timeout=setTimeout(()=>setProfiledropdown(false),300)}} className="relative w-full md:w-10 md:h-14 border justify-center align-middle items-center flex">    
                    <FaUserCircle className="hidden md:block mx-auto text-gray-700 w-28 h-8 "/>
                    <List className={`md:${profileDropdown?"visible":"hidden"} md:top-12 md:right-0 md:absolute md:bg-gray-50 md:shadow-lg px-20 md:px-0 `}>
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
                    <div  onClick={()=>handleLinks()} className="relative md:flex hidden">
                    <Link to={"/cart"}>
                    <ShoppingCartIcon className="h-8 w-10 text-gray-800"/>
                    <section className=" absolute left-4 bottom-4 bg-red-500 text-gray-100 rounded-xl text-[12px] w-[18px] h-[18px] flex justify-center items-center ">{cartTotal}</section>
                    </Link>
                    </div>
                    </>}
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    );
}