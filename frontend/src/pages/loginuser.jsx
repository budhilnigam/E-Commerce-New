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

const LoginUser=()=>{
    const [email_id,setEmailId]=useState('');
    const [password,setPassword]=useState('');
    const [authError,setAuthError]=useState('');
    const [userAuth,setUserAuth]=useState(false);
    async function login_request(email,password){
        const details = { "email_id":email,"password":password};
        const response = await fetch("/api/user/login", {
            method: "POST",
            headers: {
            'Content-Type' : 'application/json'
            },
            body: JSON.stringify(details)
            }).then((res)=>res.json(),(rej)=>rej.json()).then((data)=>{
                console.log(data.message);
                if(data.message=="Successful Login"){
                    setUserAuth(true);
                } else {
                    setAuthError(data.message);
                }
            })
    }
    if(userAuth){
        return <Navigate to="/" />
    }
    return (
        <>
            <Card className="mx-auto w-full max-w-[24rem]">
            <form onSubmit={(e)=>{e.preventDefault();login_request(email_id,password)}}>
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Sign In
              </Typography>
              <Typography
                className="mb-3 font-normal"
                variant="paragraph"
                color="gray"
              >
                Enter your email and password to Sign In.
              </Typography>
              {authError!=""?<Typography variant="small" className="flex justify-center text-red-600">
              {authError}
              </Typography>:""}
              <Typography className="-mb-2" variant="h6">
                Your Email
              </Typography>
              <Input label="Email" size="lg" type="email" required onChange={e=>setEmailId(e.target.value)}/>
              <Typography className="-mb-2" variant="h6">
                Your Password
              </Typography>
              <Input label="Password" size="lg" type="password" required onChange={e=>setPassword(e.target.value)}/>
              <div className="-ml-2.5 -mt-3">
                <Checkbox label="Remember Me" />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" type="submit" fullWidth>
                Sign In
              </Button>
              <Typography variant="small" className="mt-4 flex justify-center">
                Don&apos;t have an account?
                <Typography
                  as="a"
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold"
                  href="/signup"
                >
                  Sign up
                </Typography>
              </Typography>
            </CardFooter>
            </form>
          </Card>
        </>
    )
}

export default LoginUser;