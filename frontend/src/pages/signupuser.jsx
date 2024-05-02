import React,{ useState } from "react";
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
  } from "@material-tailwind/react";
import { Navigate } from "react-router";

const SignupUser=()=>{
    const [username,setUsername]=useState('');
    const [email_id,setEmailId]=useState('');
    const [password,setPassword]=useState('');
    const [authError,setAuthError]=useState('');
    const [userAuth,setUserAuth]=useState(false);
    async function signup_request(username,email,password,e=null){
        const details = {"username":username, "email_id":email,"password":password};
        const response = await fetch("/api/user/signup", {
            method: "POST",
            headers: {
            'Content-Type' : 'application/json'
            },
            body: JSON.stringify(details)
            }).then((res)=>res.json(),(rej)=>rej.json()).then((data)=>{
                if(data.message=="Successful Signup"){
                    setUserAuth(true);
                } else {
                    setAuthError(data.message);
                }
            });
    }
    if(userAuth){
        return <Navigate to="/" />
    }
    return (
        <>
            <Card className="mx-auto w-full max-w-[24rem]">
                <form onSubmit={(e)=>{e.preventDefault();signup_request(username,email_id,password)}}>
                    <CardBody className="flex flex-col gap-4">
                    <Typography variant="h4" color="blue-gray">
                        Sign Up
                    </Typography>
                    <Typography
                        className="mb-3 font-normal"
                        variant="paragraph"
                        color="gray"
                    >
                        Create an account to order our products.
                    </Typography>
                    {authError!=""?<Typography variant="small" className="flex justify-center text-red-600">
                        {authError}
                    </Typography>:""}
                    <Typography className="-mb-2" variant="h6">
                        Full Name
                    </Typography>
                    <Input label="Full Name" type="text" size="lg" required onChange={(e)=>setUsername(e.target.value)}/>
                    <Typography className="-mb-2" variant="h6">
                        Email ID
                    </Typography>
                    <Input label="Email" type="email" size="lg" required  onChange={(e)=>setEmailId(e.target.value)}/>
                    <Typography className="-mb-2" variant="h6">
                        Create Password
                    </Typography>
                    <Input label="Password" size="lg" type="password" required  onChange={(e)=>setPassword(e.target.value)}/>
                    <div className="-ml-2.5 -mt-3">
                        <Checkbox label="Remember Me" />
                    </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                    <Button variant="gradient" type="submit" fullWidth>
                        Sign Up
                    </Button>
                    <Typography variant="small" className="mt-4 flex justify-center">
                        Already have an account?
                        <Typography
                        as="a"
                        variant="small"
                        color="blue-gray"
                        className="ml-1 font-bold"
                        href="/login"
                        >
                        Sign in
                        </Typography>
                    </Typography>
                    </CardFooter>
                    </form>
                </Card>
        </>
    )
}

export default SignupUser;