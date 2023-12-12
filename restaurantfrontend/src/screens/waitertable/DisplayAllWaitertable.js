import {useState,useEffect} from 'react'
import MaterialTable from "@material-table/core"
import {  Grid,TextField,Button,FormControl,InputLabel,Select,MenuItem,FormHelperText, } from "@mui/material"
import { makeStyles } from "@mui/styles";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import Heading from "../../components/heading/Heading";

import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"; 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { serverURL, getData, postData} from "../../services/FetchNodeServices";

const useStyles = makeStyles({
      rootdisplay: {
      width: "auto",
      height: "100vh",
      background: "#dfe4ea",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    boxdisplay: {
      width:"60%",
      height: "auto",
      borderRadius: 10,
      background: "#fff",
      padding: 15,
    },
    root: {
        background: "#dfe4ea",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      box: {
        height: "auto",
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
    
  });
export default function DisplayAllWaitertable()
{  var classes = useStyles();
  var admin=JSON.parse(localStorage.getItem('ADMIN'))
  const navigate=useNavigate();
  const [listTable,setListTable]=useState([])
  const [open,setOpen]=useState(false)
//////////////////////// Waiter Table data  //////////////////////////////////

const [restaurantId, setRestaurantId] = useState("");

const [waitertableId, setWaitertableId] = useState("")
const [waiter,setWaiter]=useState([]);

const [floor,setFloor]=useState([]);
const [floorNo,setFloorNo]=useState('');

const [table,setTable]=useState([]);
const [waiterId, setWaiterId] = useState("");

const [tableid, settableid] = useState("");

const [currentdate, setcurrentdate] = useState("");


const [wtError,setWtError]=useState({})


const handleError = (error, input,message) => {
  setWtError(prevState => ({...prevState, [input]:{'error':error,'message':message}}));
  console.log("CC",wtError)
 };


 const validation=()=>{
    var submitRecord=true
  
    if(!restaurantId)
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


  const fetchAllTable=async()=>{
   const result=await postData('tablebooking/fetch_all_tablebooking',{restaurantid:admin.restaurantid});
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
   
    var d=new Date()
    var cd=d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()
  var body={'restaurantid':restaurantId,'waiterid':waiterId,
  'tableid':tableid,'currentdate':currentdate,'floor':floor,waitertableid:waitertableId}
  


    var result=await postData ('waitertable/waitertable_edit_data',body)

    if(result.status)
    {
      Swal.fire({
        icon: 'success',
        title: ' Waiter Table Booking Register',
        text: result.message,
        
      })
      setOpen(false)
      
    }
    else
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: result.message,
    
      })
      setOpen(false)
      
    }
    }
    fetchAllWaitertable()
    }


///////////////////////////////////////////////////////////////////////////



  const fetchAllWaitertable=async()=>{
var result=await getData('waitertable/fetch_all_waitertable',{restaurantid:admin.restaurantid})
setListTable(result.data)
  }


const handleEdit=(rowData)=>{

    setWaitertableId(rowData.waitertableid)

    setRestaurantId(rowData.restaurantid)

    setWaiterId(rowData.waiterid)

    settableid(rowData.tableid)

    setcurrentdate(rowData.currentdate)

    setFloorNo(rowData.floor)
    
   

setOpen(true)

}
const handleDialogClose=()=>{
   setOpen(false) 
}


const handleFloorChange=(event)=>{
  setFloorNo(event.target.value)
  fetchAllTable(event.target.value)
}


const showData=()=>{

    return(
        < div className={classes.root}>
            <div className={classes.box}>
    
       < Grid container spacing={2}>
       <Grid item xs={12}>
            <Heading title={"Waiter Table  Register"} />
          </Grid>
    
              <Grid item xs={6}>
                <TextField  
                onFocus={()=>handleError(false,'restaurantId','')}
                error={wtError?.restaurantId?.error}
                helperText={wtError?.restaurantId?.message}
                onChange={(event) => setRestaurantId(event.target.value)} 
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
                        defaultValue={dayjs(currentdate)}
                        fullWidth
                                  />
                 </DemoContainer>
             </LocalizationProvider>
          </Grid>
             
    
              <Grid item xs={12}></Grid>

              </Grid>
           </div>
            </div>
        );

}

  const showDataForEdit=()=>{
    return(
        <Dialog
        maxWidth={'md'} 
      open={open}>
    <DialogContent>
       {showData()}
        </DialogContent>
        <DialogActions>
        <Button onClick={handleSubmit}>Edit</Button>
            <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
  
        </Dialog>
    )
    
  }

  useEffect(function(){
fetchAllWaitertable()

  },[])

  const handleDelete=async(rowData)=>{
   
    Swal.fire({
      title: 'Do you want to Cancel the Waiter table?',
      showDenyButton: true,
      
      confirmButtonText: 'Cancel',
      denyButtonText: `Don't Cancel`,
    }).then(async(result) => {
      if (result.isConfirmed) {
        var body={'waitertableid':rowData.waitertableid}
        var result=await postData('waitertable/waitertable_delete',body)
       if(result.status)
       { Swal.fire('Cancelled!', '', result.message)
     fetchAllWaitertable()
      }
       else
        Swal.fire('Fail!', '', result.message)
      }
      else if (result.isDenied) 
      {
        Swal.fire('waiter Table not cancel', '', 'info')
      }
    })
   }
    function displayAll() {
        return (
          <MaterialTable
            title=" Waiter's Table  List"
            columns={[
              {  title: 'RestaurantId', 
            render:rowData=><><div>{rowData.restaurantid}</div></>},
              { title: 'Waiter Name', 
              render:rowData=><><div>{rowData.waitername}</div></> },
              { title: 'Table No', 
              render:rowData=><><div>{rowData.tableid}</div><div>{rowData.floor},Table{rowData.tableno}</div></> },
              { title: 'Booking Date', 
              render:rowData=><><div>{rowData.currentdate}</div></> },
             
            ]}
            data={listTable}
              
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit  Waiter Table',
                onClick: (event, rowData) => handleEdit(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Cancel Waiter Table',
                onClick: (event, rowData) => handleDelete(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add Waiter Table',
                isFreeAction: true,
                onClick: (event, rowData) => navigate('/admindashboard/waitertableinterface')},
            ]}
          />
        )
      }
return(
    
    <div className={classes.rootdisplay}>
      <div className={classes.boxdisplay}>
    {displayAll()}
    </div>
    {showDataForEdit()}
    </div>
)
}