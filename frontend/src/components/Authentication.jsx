import { useState } from "react";
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input ,
    Checkbox,
  } from "@material-tailwind/react";

const AuthWithForm=(props)=>{
    const [email_id,setEmailId]=useState(' ');
    const [password,setPassword]=useState(' ');
    const [username,setUsername]=useState(' ');
    const [authError,setAuthError]=useState('');
    const userAuth=props.userAuth;
    const setUserAuth=props.setUserAuth;
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
    const [open, setOpen] = useState(false);
    const [mode,setMode] =useState('signin');
    const handleOpen = () => {setOpen((cur) => !cur);setAuthError('')};
    const handleMode=()=>{
        if ( mode==='signin'){
            setMode('signup');
        } else if (mode==='signup') {
            setMode('signin');
        }
    }
    if(mode==='signin'){
    return (
      <>
        <Button onClick={handleOpen}>Sign In</Button>
        <Dialog
          size="xs"
          open={open && mode==='signin'}
          handler={handleOpen}
          className="bg-transparent shadow-none"
        >
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
              <Input required label="Email" size="lg" type="email" onChange={e=>setEmailId(e.target.value)}/>
              <Typography className="-mb-2" variant="h6">
                Your Password
              </Typography>
              <Input required label="Password" size="lg" type="password" onChange={e=>setPassword(e.target.value)}/>
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
                  onClick={()=>handleMode()}
                >
                  Sign up
                </Typography>
              </Typography>
            </CardFooter>
            </form>
          </Card>
        </Dialog>
      </>
    );
    }
    else {
        return (
            <>
                <Button onClick={handleOpen}>Sign In</Button>
                <Dialog
                    size="xs"
                    open={open && mode==='signup'}
                    handler={handleOpen}
                    className="bg-transparent shadow-none"
                >
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
                    <Input required label="Full Name" type="text" size="lg" onChange={(e)=>setUsername(e.target.value)}/>
                    <Typography className="-mb-2" variant="h6">
                        Email ID
                    </Typography>
                    <Input required label="Email" type="email" size="lg"  onChange={(e)=>setEmailId(e.target.value)}/>
                    <Typography className="-mb-2" variant="h6">
                        Create Password
                    </Typography>
                    <Input required label="Password" size="lg" type="password"  onChange={(e)=>setPassword(e.target.value)}/>
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
                        onClick={()=>handleMode()}
                        >
                        Sign in
                        </Typography>
                    </Typography>
                    </CardFooter>
                    </form>
                </Card>
                </Dialog>
            </>
        );
}
}

export default AuthWithForm;