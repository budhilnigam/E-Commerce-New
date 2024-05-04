import { useState,useEffect } from "react";
import {
    Button,
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input ,
    Checkbox,
  } from "@material-tailwind/react";
const AddressForm = (props) => {
    const [open, setOpen] = useState(false);
    function handleOpen(){
        setOpen(!open);
    }
    const [line1,setLine1]=useState('');
    const [line2,setLine2]=useState('');
    const [state,setState]=useState('');
    const [city,setCity]=useState('');
    const [pincode,setPincode]=useState('');
    const [primary,setPrimary]=useState(false);
    if (props.type=='Change address'){
        useEffect(()=>{fetch("/api/dashboard/aboutuser").then(res=>res.json()).then(data=>{
            setLine1(data.line1);
            setLine2(data.line2);
            setState(data.state);
            setCity(data.city);
            setPincode(data.pincode);
    })},[]);
    }
    return (
        <>
            <Button onClick={handleOpen}>{props.type}</Button>
            <Dialog
            size="xs"
            open={open}
            handler={handleOpen}
            className="bg-transparent shadow-none"
        >
          <Card className="mx-auto w-full max-w-[24rem]">
            <form onSubmit={(e)=>{e.preventDefault()}}>
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Address Details
              </Typography>
              <Typography
                className="mb-3 font-normal"
                variant="paragraph"
                color="gray"
              >
                Add your delivery address
              </Typography>
              <Typography className="-mb-2" variant="h6">
                Address Line 1
              </Typography>
              <Input required label="Line 1" size="lg" type="text" value={line1} onChange={e=>setLine1(e.target.value)}/>
              <Typography className="-mb-2" variant="h6">
                Address Line 2
              </Typography>
              <Input required label="Line 2" size="lg" type="text" value={line2!=null?line2:""} onChange={e=>setLine2(e.target.value)}/>
              <Typography className="-mb-2" variant="h6">
                City
              </Typography>
              <Input required label="City" size="lg" type="text" value={city} onChange={e=>setCity(e.target.value)}/>
              <Typography className="-mb-2" variant="h6">
                State
              </Typography>
              <Input required label="State" size="lg" type="text" value={state} onChange={e=>setState(e.target.value)}/>
              <Typography className="-mb-2" variant="h6">
                Pincode
              </Typography>
              <Input required label="Pincode" size="lg" type="number" value={pincode} onChange={e=>setPincode(e.target.value)}/>
              <div className="-ml-2.5 -mt-3">
                <Checkbox label="Set this as your primary address" onChange={(e)=>{setPrimary(e.target.checked)}}/>
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" type="submit" fullWidth>
                Confirm Address
              </Button>
            </CardFooter>
            </form>
          </Card>
        </Dialog>
        </>
    )
}

export default AddressForm;