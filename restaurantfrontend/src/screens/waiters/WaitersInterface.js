import { useState,useEffect } from "react";
import { Avatar, Grid,TextField,Button,FormControl,
    FormHelperText, FormLabel, RadioGroup,FormControlLabel,Radio, } from "@mui/material"
import { makeStyles } from "@mui/styles";
import UploadFile from "@mui/icons-material/UploadFile";
import Swal from 'sweetalert2'
import Heading from "../../components/heading/Heading";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"; 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { serverURL,getData, postData} from "../../services/FetchNodeServices";


const useStyles = makeStyles({
    root: {
      width: "auto",
      height: "100vh",
      background: "#dfe4ea",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    box: {
        width: "60%",
        height: "auto%",
        borderRadius: 10,
        background: "#fff",
        padding: 15,
      },
      heading:{
        fontFamily:'Kanit',
        fontWeight:'Bold',
        fontSize:20,
        letterSpacing:1,
        paddingLeft:10,
        display:'flex',
        alignItems:'center',
        flexDirection:'row'
      },
      center: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
})

export default function WaitersInterface() {
 
    var classes = useStyles();
    var admin=JSON.parse(localStorage.getItem('ADMIN'))

    const [restaurantId, setRestaurantId] = useState("");
    const [waiterName, setWaiterName] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [mobileno, setMobileNo] = useState("");
    const [emailid, setEmailid] = useState("");
    const [address, setAddress] = useState("");
    const [picture, setPicture] = useState({url:'',bytes:''});


    const [waitError,setWaitError]=useState({})


    const handleError = (error, input,message) => {
      setWaitError(prevState => ({...prevState, [input]:{'error':error,'message':message}}));
      console.log("CC",waitError)
     };


const validation=()=>{
  var submitRecord=true

  if(restaurantId.length==0)
  {
   handleError(true,'restaurantId',"Pls Input Restaurant Id")
    
   submitRecord=false
  }

  if(waiterName.trim().length==0)
  {
   handleError(true,'waiterName',"Pls Input Waiter Name ")
    
   submitRecord=false
  }

  if(!gender)
  {
   handleError(true,'gender',"Pls Select Gender")
    
   submitRecord=false
  }
 
  if(!mobileno || !(/^[0-9]{10}$/).test(mobileno))
  {
   handleError(true,'mobileno',"Pls Input Correct Mobile Number")
    
   submitRecord=false
  }
 
  if(!emailid || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailid))) 
  {
    handleError(true,'emailid',"Pls Input Correct Email Address")
     
    submitRecord=false
  }
 
  if(!address)
    {
     handleError(true,'address',"Pls Input Address")
      
     submitRecord=false
    }
 
   
 

  if(!picture.url)
  {
   handleError(true,'picture',"Pls Upload Picture")
    
   submitRecord=false
  }
    return submitRecord
}

useEffect(function(){
  setRestaurantId(admin.restaurantid)
},[])


const handleDate=(event)=>{
  const m=String(Number(event.$M)+1);
  const d=String(event.$D);
  const y=String(event.$y);
  setDob(d+"-"+m+"-"+y);   
}

const handlePicture=(event)=>{
   setPicture({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]}) 
}

const handleSubmit=async()=>{ 
  var error=validation()
  console.log("After Submit:",waitError)
 if(error)
 {
var formData=new FormData()
formData.append('restaurantid',restaurantId)
formData.append('waitername',waiterName)
formData.append('gender',gender)
formData.append('dob',dob)
formData.append('mobileno',mobileno)
formData.append('emailid',emailid)
formData.append('address',address)
formData.append('picture',picture.bytes)


var result=await postData ('waiters/waiters_submit',formData)

if(result.status)
{
  Swal.fire({
    icon: 'success',
    title: 'Waiters Register',
    text: result.message,
    
  })
  
}
else
{
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: result.message,

  })
  
}
}
}

return(
    < div className={classes.root}>
        <div className={classes.box}>

   < Grid container spacing={2}>
   <Grid item xs={12}>
            <Heading title={"Waiters Register"}  myroute={'/admindashboard/displayallwaiters'}/>
          </Grid>

          <Grid item xs={6}>
            <TextField  
         disabled
         value={restaurantId}
            label="Restaurant Id" fullWidth />
          </Grid>

          <Grid item xs={6}>
            <TextField
             onFocus={()=>handleError(false,'waiterName','')}
             error={waitError?.waiterName?.error}
             helperText={waitError?.waiterName?.message}
              onChange={(event) => setWaiterName(event.target.value)}
              label="Waiter Name"
              fullWidth
            />
          </Grid>
        


          <Grid item xs={6}>
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onFocus={()=>handleError(false,'gender','')}
               error={waitError?.gender?.error}
               helperText={waitError?.gender?.message}
               onChange={(event) => setGender(event.target.value)}
                >
            < FormControlLabel value="Male" control={<Radio />} label="Male" />
            < FormControlLabel value="Female" control={<Radio />} label="Female" />
                </RadioGroup>
                <FormHelperText style={{color:'red'}}>{waitError?.gender?.message}</FormHelperText>
            </FormControl>
          </Grid>


          <Grid item xs={6}>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>        
                      <DatePicker
                        label="DOB "
                        format="DD-MM-YYYY"
                        onChange={handleDate}
                     fullWidth
                      />
                 </DemoContainer>
             </LocalizationProvider>
          </Grid>

          <Grid item xs={6}>
            <TextField
               onFocus={()=>handleError(false,'mobileno','')}
               error={waitError?.mobileno?.error}
               helperText={waitError?.mobileno?.message}
              onChange={(event) => setMobileNo(event.target.value)}
              label="Mobile Number"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              onFocus={()=>handleError(false,'emailid','')}
              error={waitError?.emailid?.error}
              helperText={waitError?.emailid?.message}
              
              onChange={(event) => setEmailid(event.target.value)}
              label="Email Address"
              fullWidth
            />
          </Grid>



          <Grid item xs={12}>
            <TextField
              onFocus={()=>handleError(false,'address','')}
              error={waitError?.address?.error}
              helperText={waitError?.address?.message}
              
              onChange={(event) => setAddress(event.target.value)}
              label="Address"
              fullWidth
            />
          </Grid>

        

          

          <Grid item xs={4}>
           <Button  component="label" variant="contained"  endIcon={<UploadFile />} fullWidth>
           <input 
            onFocus={()=>handleError(false,'picture','')}
           onChange={handlePicture}
            hidden  accept="image/*"
           multiple type="file"  />
            Upload Picture
           </Button>
           {
            waitError?.picture?.error?<div style={{color:'red',fontSize:'0.8rem', paddingLeft:5 ,  margin:5}}>{waitError?.picture?.message}</div>:<></>
            }
          </Grid>


          <Grid item xs={8}></Grid>
          < Grid item xs={4} className={classes.center} >
          <Avatar 
              variant="rounded"
              alt="Remy Sharp"
              src={picture.url}
              sx={{ width: 56, height: 56 }}
            />
</Grid>
<Grid item xs={8}>

</Grid>

          <Grid item xs={6}>
            <Button onClick={handleSubmit} variant="contained" fullWidth>
              Submit
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" fullWidth>
              Reset
            </Button>
          </Grid>
          </Grid>
       </div>
        </div>
    );
}