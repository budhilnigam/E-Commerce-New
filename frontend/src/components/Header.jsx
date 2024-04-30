import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {MdElectricBolt,MdOutlineClose} from "react-icons/md";
import {FaBars,FaUserCircle,FaPowerOff, FaShoppingCart } from "react-icons/fa"
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


const AuthWithForm=(props)=>{
    const [email_id,setEmailId]=useState(' ');
    const [password,setPassword]=useState(' ');
    const [username,setUsername]=useState(' ');
    const userAuth=props.userAuth;
    const setUserAuth=props.setUserAuth;
    async function login_request(email,password,e=null){
        const details = { "email_id":email,"password":password};
        const response = await fetch("/api/user/login", {
            method: "POST",
            headers: {
            'Content-Type' : 'application/json'
            },
            body: JSON.stringify(details)
            }).then((res)=>res.json(),(rej)=>rej).then((data)=>{
                console.log(data.message);
                if(data.message=="Successful Login"){
                    setUserAuth(true);
                } else{

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
            }).then((message)=>console.log(message.json()),(message)=>console.log(message.json()['error']));
    }
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
            <form onSubmit={(e)=>{e.preventDefault();login_request(email_id,password,e)}}>
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
              <Input label="Email" size="lg" type="email" onChange={e=>setEmailId(e.target.value)}/>
              <Typography className="-mb-2" variant="h6">
                Your Password
              </Typography>
              <Input label="Password" size="lg" type="password" onChange={e=>setPassword(e.target.value)}/>
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
                    <Typography className="-mb-2" variant="h6">
                        Full Name
                    </Typography>
                    <Input label="Full Name" size="lg" onChange={(e)=>setUsername(e.target.value)}/>
                    <Typography className="-mb-2" variant="h6">
                        Email ID
                    </Typography>
                    <Input label="Email" type="email" size="lg"  onChange={(e)=>setEmailId(e.target.value)}/>
                    <Typography className="-mb-2" variant="h6">
                        Create Password
                    </Typography>
                    <Input label="Password" size="lg" type="password"  onChange={(e)=>setPassword(e.target.value)}/>
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
export const Navbar = () => {
    const [userAuth,setUserAuth]=useState(false);
    useEffect(()=>{fetch('/api/user').then((res)=>res.json()).then(data=>{
        if (data.status=='authenticated'){
            setUserAuth(data.user_id);
        } else {
            setUserAuth(false);
        }
    })},[userAuth])
    const [openNav,setOpenNav]=useState(false);
    const [activeLink,setActiveLink]=useState(window.location.pathname);
    function handleLinks(){
        setActiveLink(window.location.pathname);
    }
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
        <header>
        <nav className="bg-gray-100 shadow-xl px-4 md:px-16 w-full top-0 h-14">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-2xl text-2xl my-auto h-full ">
                <Link to="/" className="flex flex-row items-center">
                    <MdElectricBolt className="mr-1 text-yellow-700 text-4xl" alt="Logo" />
                    <div style={{"fontFamily":"Papyrus"}}>ElectroMart</div>
                </Link>
                <div className="flex md:hidden items-center md:order-2">
                    <button onClick={() => setOpenNav(!openNav)} className="p-2 ml-1 text-xl rounded-md md:hidden
                     focus:outline-none focus:ring-2 focus:ring-gray-200 ">
                        {!openNav ? <FaBars /> : <MdOutlineClose />}
                    </button>
                </div>
                <div className={`${openNav ? "right-0" : "-right-[100%]"} top-[72px] bg-gray-100 md:bg-none
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
                    <span className="bg-black w-full h-[1px]"></span>
                    <div className="relative w-full md:w-min">    
                    <FaUserCircle className="hidden md:block text-3xl mx-auto text-gray-900 " onMouseOver={()=>setProfiledropdown(true)} onMouseLeave={()=>{timeout=setTimeout(()=>setProfiledropdown(false),500)}}/>
                    <ul className={`md:${profileDropdown?"visible":"hidden"} md:absolute md:bg-white md:text-gray-700 rounded text-lg md:text-base  py-2 px-4 md:w-[120px] md:flex-col space-y-4 mt-2 -left-20 `} onMouseOver={()=>{clearTimeout(timeout);setProfiledropdown(true)}} onMouseLeave={()=>{timeout=setTimeout(()=>setProfiledropdown(false),500)}}>
                        <li onClick={()=>handleLinks()}><Link to={"/profile"}>Dashboard</Link></li>
                        <li onClick={()=>handleLinks()}><Link to={"/orders"}>Orders</Link></li>
                        <li onClick={()=>handleLinks()}><Link to={"/wishlist"}>Wislist</Link></li>
                        <li className="md:hidden" onClick={()=>handleLinks()}><Link to={"/cart"}>Cart</Link></li>
                        <li onClick={()=>setActiveLink("/")}><Link to={"/"}><button className="flex" onClick={()=>{fetch("/api/user/logout",{method: "GET"}).then((res)=>res.json(),(rej)=>rej).then((data)=>{console.log(data.message)})
            ;setUserAuth(false);}}>Logout<FaPowerOff className=" ml-1 my-auto text-gray-800"/></button></Link></li>
                    </ul>
                    </div>
                    <div  onClick={()=>handleLinks()} className="relative md:flex hidden">
                    <Link to={"/cart"}>
                    <FaShoppingCart className="text-gray-900 text-3xl"/>
                    <section className=" absolute left-3 bottom-4 bg-red-500 text-gray-100 rounded-xl text-[12px] w-[18px] h-[18px] flex justify-center items-center ">10</section>
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