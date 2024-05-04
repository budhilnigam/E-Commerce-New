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
            <section className="ml-3 w-full">
            <p className="text-3xl font-semibold mb-10 px-4">About you</p>
            <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Full name
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userDetails.user_name}
                </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Email address
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userDetails.email_id}
                </dd>
            </div>
            <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Primary Address Details
                </dt>
                {userDetails.line1!=null?
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userDetails.line1}<br/>
                    {userDetails.line2!=null?userDetails.line2+"<br>":""}
                    {userDetails.city}<br/>
                    {userDetails.state}<br/>
                    Pincode: {userDetails.pincode}
                </dd>:""}
            </div>
            </dl>
            </div>
            </section>
        </div>
    )
}

export default UserProfile;