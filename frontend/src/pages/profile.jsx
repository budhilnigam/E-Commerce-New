import { useEffect, useState } from "react";
import Dashboard from "./dashboard";
import { Navigate } from "react-router";

const UserProfile = () => {
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
    return (
        <>
            <Dashboard />
        </>
    )
}

export default UserProfile;