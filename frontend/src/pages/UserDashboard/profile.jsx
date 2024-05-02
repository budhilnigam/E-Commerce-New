import {useState, useEffect } from "react";
import Dashboard from "./dashboard";
import { Navigate } from "react-router";
import { Typography } from "@material-tailwind/react";

const UserProfile = () => {
    const [userDetails,setUserDetails] = useState({})
    async function fetchUserDetails() {
        await fetch('api/dashboard/aboutuser').then(res=>res.json()).then(data=>{
            setUserDetails(data);
        })
    }
    useEffect(() => {
        fetchUserDetails();
    },[])
    return (
        <div className="flex flex-row">
            <Dashboard />
            <section className="bg-red-300 w-full">
            <Typography variant="h5">{userDetails.user_name}</Typography>
            <Typography variant="h5">{userDetails.email_id}</Typography>
            <Typography variant="h5">{userDetails.line1}</Typography>
            <Typography variant="h5">{userDetails.line2}</Typography>
            <Typography variant="h5">{userDetails.city}</Typography>
            <Typography variant="h5">{userDetails.state}</Typography>
            <Typography variant="h5">{userDetails.pincode}</Typography>
            </section>
        </div>
    )
}

export default UserProfile;