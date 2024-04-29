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

  const DialogWithForm=()=>{
    const [open, setOpen] = useState(false);
    const [mode,setMode] =useState('signin');
    const handleOpen = () => setOpen((cur) => !cur);
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
              <Typography className="-mb-2" variant="h6">
                Your Email
              </Typography>
              <Input label="Email" size="lg" />
              <Typography className="-mb-2" variant="h6">
                Your Password
              </Typography>
              <Input label="Password" size="lg" />
              <div className="-ml-2.5 -mt-3">
                <Checkbox label="Remember Me" />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" onClick={handleOpen} fullWidth>
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
                    <CardBody className="flex flex-col gap-4">
                    <Typography variant="h4" color="blue-gray">
                        Sign Up
                    </Typography>
                    <Typography
                        className="mb-3 font-normal"
                        variant="paragraph"
                        color="gray"
                    >
                        Enter your email and password to Sign In.
                    </Typography>
                    <Typography className="-mb-2" variant="h6">
                        Your Email
                    </Typography>
                    <Input label="Email" size="lg" />
                    <Typography className="-mb-2" variant="h6">
                        Your Password
                    </Typography>
                    <Input label="Password" size="lg" />
                    <div className="-ml-2.5 -mt-3">
                        <Checkbox label="Remember Me" />
                    </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                    <Button variant="gradient" onClick={handleOpen} fullWidth>
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
                </Card>
                </Dialog>
            </>
        );
    }
}
const Home=()=>{
    return (
        <>
            <h1>Home</h1>
        </>
    )
}
export default Home;