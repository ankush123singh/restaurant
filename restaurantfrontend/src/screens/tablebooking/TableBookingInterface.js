import { useState,useEffect } from "react";
import {  Grid,TextField,Button,FormControl,InputLabel,Select,MenuItem,FormHelperText, } from "@mui/material"
import { makeStyles } from "@mui/styles";

import Swal from 'sweetalert2'
import Heading from "../../components/heading/Heading";

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

export default function TableBookingInterface() {
 
    var classes = useStyles();
    var admin=JSON.parse(localStorage.getItem('ADMIN'))

    const [restaurantId, setRestaurantId] = useState("");
    
    const [tableNo, setTableNo] = useState("");
    const [noofChairs, setNoofChairs] = useState("");
    const [floor, setFloor] = useState("");
    

    const [tabError,setTabError]=useState({})


    const handleError = (error, input,message) => {
      setTabError(prevState => ({...prevState, [input]:{'error':error,'message':message}}));
      console.log("CC",tabError)
     };


const validation=()=>{
  var submitRecord=true

  if(restaurantId.length==0)
  {
   handleError(true,'restaurantId',"Pls Input Restaurant Id")
    
   submitRecord=false
  }


  if(!tableNo  || !(/^[0-9]{1}$/).test(tableNo) )
  {
   handleError(true,'tableNo',"Pls Input  Valid Table No(0-9).")
    
   submitRecord=false
  }
 
  if(!noofChairs  || !(/^[0-8]{1}$/).test(noofChairs))
  {
   handleError(true,'noofChairs',"Pls Input Valid  No. Of Chairs(0-8)")
    
   submitRecord=false
  }
 
  if(!floor)
  {
   handleError(true,'floor',"Pls Select Floor")
    
   submitRecord=false
  }
 

    return submitRecord
}

useEffect(function(){
  setRestaurantId(admin.restaurantid)
},[])


const handleSubmit=async()=>{ 
  var error=validation()
  console.log("After Submit:",tabError)
 if(error)
 {
var body={'restaurantid':restaurantId,'tableno':tableNo,
'noofchairs':noofChairs,'floor':floor}



var result=await postData ('tablebooking/tablebooking_submit',body)

if(result.status)
{
  Swal.fire({
    icon: 'success',
    title: 'Table Booking Register',
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
            <Heading title={"Table Booking Register"} myroute={'/admindashboard/displayalltablebooking'}/>
          </Grid>

          <Grid item xs={6}>
            <TextField  
              disabled
            label="Restaurant Id" fullWidth 
            value={restaurantId}
            />
          </Grid>


  

          <Grid item xs={6}>
            <TextField
             onFocus={()=>handleError(false,'tableNo','')}
             error={tabError?.tableNo?.error}
             helperText={tabError?.tableNo?.message}
              onChange={(event) => setTableNo(event.target.value)}
              label="Table No "
              fullWidth
            />
          </Grid>

    


          <Grid item xs={6}>
            <TextField
             onFocus={()=>handleError(false,'noofChairs','')}
             error={tabError?.noofChairs?.error}
             helperText={tabError?.noofChairs?.message}
              onChange={(event) => setNoofChairs(event.target.value)}
              label="No Of Chairs"
              fullWidth
            />
          </Grid>

        
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>  Select Floor</InputLabel>
              <Select
               onFocus={()=>handleError(false,'floor','')}
               error={tabError?.floor?.error}
               helperText={tabError?.floor?.message}
                label="Select Floor"
                value={floor}
                onChange={(event) => setFloor(event.target.value)}
              >
                <MenuItem selected>-Select Floor-</MenuItem>
                <MenuItem value="Ground Floor">Ground Floor</MenuItem>
                <MenuItem value="1 Floor">1 Floor</MenuItem>
                <MenuItem value="2 Floor">2 Floor</MenuItem>
                <MenuItem value="3 Floor">3 Floor</MenuItem>
                <MenuItem value="4 Floor">4 Floor</MenuItem>
                <MenuItem value="5 Floor">5 Floor</MenuItem>
                <MenuItem value="Roof Top">Roof Top</MenuItem>
                <MenuItem value="Valcany">Valcany</MenuItem>
               
              </Select>
              <FormHelperText style={{color:'red'}}>{tabError?.floor?.message}</FormHelperText>
            </FormControl>
          </Grid>
       
          <Grid item xs={12}></Grid>
        




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