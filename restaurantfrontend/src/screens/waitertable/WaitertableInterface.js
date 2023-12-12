import { useState,useEffect } from "react";
import {  Grid,TextField,Button,FormControl,InputLabel,Select,MenuItem,FormHelperText, } from "@mui/material"
import { makeStyles } from "@mui/styles";

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

export default function WaitertableInterface() {
 
    var classes = useStyles();
    var admin=JSON.parse(localStorage.getItem('ADMIN'))

    const [restaurantId, setRestaurantId] = useState("");
    const [waiter,setWaiter]=useState([]);

    const [floor,setFloor]=useState([]);
    const [floorNo,setFloorNo]=useState('');

    const [waiterId, setWaiterId] = useState("");
    const [table,setTable]=useState([]);
    const [tableid, settableid] = useState("");
    const [currentdate, setcurrentdate] = useState("");
    

    const [wtError,setWtError]=useState({})


    const handleError = (error, input,message) => {
      setWtError(prevState => ({...prevState, [input]:{'error':error,'message':message}}));
      console.log("CC",wtError)
     };


const validation=()=>{
  var submitRecord=true

  if(restaurantId.length==0)
  {
   handleError(true,'restaurantId',"Pls Input Restaurant Id")
    
   submitRecord=false
  }


  if(waiterId.length==0 )
  {
   handleError(true,'waiterId',"Pls Select Waiter Id ")
    
   submitRecord=false
  }
 
 
 
  if(tableid.length==0 )
  {
   handleError(true,'tableid',"Pls Select Table No Id ")
    
   submitRecord=false
  }
 

  if(!currentdate)
  {
    handleError(true,'currentdate',"Plz Input  Current Date")
  }
    return submitRecord
}

const fetchAllWaiter=async()=>{
  const result=await postData('waiters/fetch_all_waiters',{restaurantid:admin.restaurantid});
  setWaiter(result.data);
}

useEffect(function(){
   fetchAllWaiter();
   fetchAllTable(); 
    fetchAllFloor();
   setRestaurantId(admin.restaurantid)
},[]);

const fillWaiter=()=>{
 return waiter.map((item)=>{
   return <MenuItem value={item.waiterid}>{item.waitername}</MenuItem>
 });
}

const fetchAllFloor=async()=>{
 const result=await postData('tablebooking/fetch_all_floor',{restaurantid:admin.restaurantid});
 setFloor(result.data);
}

const fillFloor=()=>{
  return floor.map((item)=>{
    return <MenuItem value={item.floor}>{item.floor}</MenuItem>
  });
  }

const fetchAllTable=async(fn)=>{
 const result=await postData('tablebooking/fetch_all_table_by_floor',{restaurantid:admin.restaurantid,floor:fn});
 setTable(result.data);
}

const fillTable=()=>{
return table.map((item)=>{
  return <MenuItem value={item.tableid}>{item.tableno}</MenuItem>
});
}






const handleDate=(event)=>{
  const m=String(Number(event.$M)+1);
  const d=String(event.$D);
  const y=String(event.$y);
  setcurrentdate(d+"-"+m+"-"+y);   
}

const handleSubmit=async()=>{ 
  var error=validation()
  console.log("After Submit:",wtError)
 if(error)
 {
   
var body={'restaurantid':restaurantId,'waiterid':waiterId,
'tableid':tableid,'currentdate':currentdate}



var result=await postData ('waitertable/waitertable_submit',body)

if(result.status)
{
  Swal.fire({
    icon: 'success',
    title: 'Waiter Table Register',
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


const handleFloorChange=(event)=>{
  setFloorNo(event.target.value)
  fetchAllTable(event.target.value)
}


return(
    < div className={classes.root}>
        <div className={classes.box}>

   < Grid container spacing={2}>
   <Grid item xs={12}>
            <Heading title={"Waiter Table  Register"}myroute={'/admindashboard/displayallwaitertable'} />
          </Grid>

          <Grid item xs={6}>
            <TextField  
        disabled 
            label="Restaurant Id" fullWidth 
            value={restaurantId}
            />
          </Grid>


  
    
       
       


       

        
          <Grid item xs={6}>
           <FormControl fullWidth>
            <InputLabel>Waiter Name</InputLabel>
            <Select label={"Category Name"} 
              
               onChange={(event)=>setWaiterId(event.target.value)} 
              value={waiterId}>
              <MenuItem>-Select Waiter-</MenuItem>
              {fillWaiter()}
            </Select>  
           </FormControl>
        </Grid>



        <Grid item xs={6}>
           <FormControl fullWidth>
            <InputLabel>Floor No</InputLabel>
            <Select label={"Floor no"} 
             
               onChange={(event)=>handleFloorChange(event)} 
              value={floorNo}>
              <MenuItem>-Select Floor-</MenuItem>
              {fillFloor()}
            </Select>
           </FormControl>
        </Grid>


        <Grid item xs={6}>
           <FormControl fullWidth>
            <InputLabel>Table No</InputLabel>
            <Select label={"Table no"} 
             
               onChange={(event)=>settableid(event.target.value)} 
              value={tableid}>
              <MenuItem>-Select Table No-</MenuItem>
              {fillTable()}
            </Select>
           </FormControl>
        </Grid>
       

          <Grid item xs={6}>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker', 'DatePicker']}>        
                      <DatePicker
                        label="Current Date "
                        format="DD-MM-YYYY"
                        onChange={handleDate}
                     fullWidth
                      />
                 </DemoContainer>
             </LocalizationProvider>
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