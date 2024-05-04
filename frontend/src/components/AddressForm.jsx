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
    const line1=props.line1;
    const line2=props.line2;
    const state=props.state;
    const city=props.city;
    const pincode=props.pincode;
    const primary=props.primary;
    const setLine1=props.setLine1;
    const setLine2=props.setLine2;
    const setState=props.setState;
    const setCity=props.setCity;
    const setPincode=props.setPincode;
    const setPrimary=props.setPrimary;
    const address_changed=props.address_changed;
    const setAddress_changed=props.setAddress_changed;
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
            <form onSubmit={(e)=>{e.preventDefault();setAddress_changed(true)}}>
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