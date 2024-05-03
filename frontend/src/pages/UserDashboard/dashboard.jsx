import { useState } from "react";
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
    ShoppingCartIcon,
  UserCircleIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
 
import { FaHeart,FaBoxOpen } from "react-icons/fa";
const Dashboard=()=>{
    async function authorization(){
        await fetch('/api/user').then(res=>res.json()).then(data=>{
            if(data.status==='notauthenticated'){
                return false;
            } else if (data.status==='authenticated'){
                return data.user_id;
            }
        }
    )}
    const auth=authorization();
    if (auth===false){
        return <Navigate to="/login" />
    }
    const [activeLink,setActiveLink]=useState(window.location.pathname);
    function handleLinks(){
        setActiveLink(window.location.pathname);
    }
    return (
    <Card className="h-[calc(100vh-2rem)] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Dashboard
        </Typography>
      </div>
      <List className="w-[20px]">
        <a href="/profile">
        <ListItem className="w-full" onClick={()=>{handleLinks();}}>
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
    </Card>
  );
}
export default Dashboard;