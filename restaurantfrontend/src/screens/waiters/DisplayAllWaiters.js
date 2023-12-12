import {useState,useEffect} from 'react'
import MaterialTable from "@material-table/core"
import { makeStyles } from "@mui/styles";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
 
import { Snackbar, Avatar, Grid,TextField,Button,Select,
    FormHelperText, FormLabel, RadioGroup,FormControlLabel,Radio, } from "@mui/material"


import FormControl from "@mui/material/FormControl";
import UploadFile from "@mui/icons-material/UploadFile";
import Swal from 'sweetalert2'

import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"; 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useNavigate } from 'react-router-dom';
import Heading from "../../components/heading/Heading";

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
    width: "80%",
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
export default function DisplayAllWaiters()
{  var classes = useStyles();
  var admin=JSON.parse(localStorage.getItem('ADMIN'))
  const navigate=useNavigate()
    const [listWaiters,setListWaiters]=useState([])
    const [open,setOpen]=useState(false)

    //////////// Waiters Data /////////////////////

    const [waiterId, setWaiterId] = useState("");

    const [restaurantId, setRestaurantId] = useState("");
    const [waiterName, setWaiterName] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [mobileno, setMobileNo] = useState("");
    const [emailid, setEmailid] = useState("");
    const [address, setAddress] = useState("");
    const [picture, setPicture] = useState({url:'',bytes:''});

    const [tempFile,setTempFile]=useState({picture:''})

    const [waitError,setWaitError]=useState({})

    const [btnStatus,setBtnStatus]=useState(false)

    const handleError = (error, input,message) => {
        setWaitError(prevState => ({...prevState, [input]:{'error':error,'message':message}}));
        console.log("CC",waitError)
       };
  
  
  const validation=()=>{
    var submitRecord=true
    
    if(!restaurantId)
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
 

  const handleDate=(event)=>{
    const m=String(Number(event.$M)+1);
    const d=String(event.$D);
    const y=String(event.$y);
    setDob(d+"-"+m+"-"+y);   
  }
   
  const handlePicture=(event)=>{
    setPicture({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]}) 
    setBtnStatus(true) 
} 


 const handleSubmit=async()=>{ 
    var error=validation()
    console.log("After Submit:",waitError)
   if(error)
   {
   
  var body={'restaurantid':restaurantId,'waitername':waiterName,
  'gender':gender,'dob':dob,
  'mobileno':mobileno,'emailid':emailid,
  'address':address,waiterid:waiterId }
  
  
  var result=await postData('waiters/waiters_edit_data',body)
  
  if(result.status)
  {
    Swal.fire({
      icon: 'success',
      title: 'Waiters Register',
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
  fetchAllWaiters()
  }


    /////////////////////////////////////////////////////



   const handleCancel=()=>{
 
    setBtnStatus(false)
    setPicture({url:tempFile.picture,bytes:''})
   
 
   }


  const editImage=async()=>{
  
    var formData=new FormData()
    formData.append('waiterid',waiterId)
    formData.append('picture',picture.bytes)
    var result=await postData('waiters/waiters_edit_picture',formData)
    if(result.status)
    {
      Swal.fire({
        icon: 'success',
        title: 'Waiters Registration',
        text: result.message,
        position:'top-end',
        timer: 5000,
        showConfirmButton: false,
        toast:true,
        
      })
      
    }
    else
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: result.message,
        position:'top-end',
        timer: 5000,
        showConfirmButton: false,
        toast:true,
      })
     
    }
 
fetchAllWaiters()
 setBtnStatus(false) 
 
}
  


   const editDeleteButton=()=>{
    return(<div>
       < Button onClick={editImage}>Edit</Button>
       <Button onClick={handleCancel}>Cancel</Button>
    </div>)
   }






    const fetchAllWaiters=async()=>{
     var result=await postData('waiters/fetch_all_waiters',{restaurantid:admin.restaurantid})
     setListWaiters(result.data)
    }


   const handleEdit=(rowData)=>{
    
    setWaiterId(rowData.waiterid)

    setRestaurantId(rowData.restaurantid)
    setWaiterName(rowData.waitername)
    setGender(rowData.gender)
    setDob(rowData.dob)
    setMobileNo(rowData.mobileno)
    setEmailid(rowData.emailid)
    setAddress(rowData.address)
  
    setPicture({url:`${serverURL}/images/${rowData.picture}`,bytes:''})
   
    setTempFile({picture:`${serverURL}/images/${rowData.picture}`})

    setOpen(true)

   }
   const handleDialogClose=()=>{
    setOpen(false)

    fetchAllWaiters()
   }

  const showData=()=>{
    return (
      <div className={classes.root} >
        <div className={classes.box} >
        < Grid container spacing={2}>
        <Grid item xs={12}>
            <Heading title={"Waiters Register"} />
          </Grid>


   <Grid item xs={6}>
            <TextField  
              onFocus={()=>handleError(false,'restaurantId','')}
              error={waitError?.restaurantId?.error}
              helperText={waitError?.restaurantId?.message}
            onChange={(event) => setRestaurantId(event.target.value)} 
            label="Restaurant Id" 
            value={restaurantId}
            fullWidth />
          </Grid>

          <Grid item xs={6}>
            <TextField
             onFocus={()=>handleError(false,'waiterName','')}
             error={waitError?.waiterName?.error}
             helperText={waitError?.waiterName?.message}
              onChange={(event) => setWaiterName(event.target.value)}
              label="Waiter Name"
              fullWidth
              value={waiterName}
            />
          </Grid>
   

          <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>        
                          <DatePicker
                            label="DOB of Waiter"
                            format="DD-MM-YYYY"
                            defaultValue={dayjs(dob)}
                            onChange={handleDate}                           
                          />
                    </DemoContainer>
                </LocalizationProvider>
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
               value={gender}
                >
            < FormControlLabel value="Male" control={<Radio />} label="Male" />
            < FormControlLabel value="Female" control={<Radio />} label="Female" />
                </RadioGroup>
                <FormHelperText style={{color:'red'}}>{waitError?.gender?.message}</FormHelperText>
            </FormControl>
          </Grid>


        
          


          <Grid item xs={6}>
            <TextField
               onFocus={()=>handleError(false,'mobileno','')}
               error={waitError?.mobileno?.error}
               helperText={waitError?.mobileno?.message}
              onChange={(event) => setMobileNo(event.target.value)}
              label="Mobile Number"
              fullWidth
              value={mobileno}
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
              value={emailid}
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
              value={address}
            />
          </Grid>


            <Grid item xs={4}  >
             
              <Button
                fullWidth
                component="label"
                variant="contained"
                endIcon={<UploadFile />}
              >
                <input  
                onFocus={()=>handleError(false,'picture','')}
                onChange={handlePicture} hidden accept="image/*" multiple type="file" />
                Upload Picture
              </Button>
              {
              waitError?.picture?.error?<div style={{color:'red',fontSize:'0.8rem',margin:5}}>{waitError?.picture?.message}</div>:<></>
              }
              
             </Grid>
             <Grid item xs={8}></Grid>
            <Grid item xs={4} className={classes.center}>
              <Avatar
                variant="rounded"
                alt="Remy Sharp"
                src={picture.url}
                sx={{ width: 56, height: 56 }}
              />
               <div>
                { btnStatus?editDeleteButton() :<></>}
              </div>
            

            </Grid>
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
        <DialogContent  >
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
        fetchAllWaiters()

    },[])

    const handleDelete=async(rowData)=>{
   
    Swal.fire({
      title: 'Do you want to delete the waiter info ?',
      showDenyButton: true,
      
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then(async(result) => {
      if (result.isConfirmed) {
        var body={'waiterid':rowData.waiterid}
        var result=await postData('waiters/waiters_delete',body)
       if(result.status)
       { Swal.fire('Deleted!', '', result.message)
     fetchAllWaiters()
      }
       else
        Swal.fire('Fail!', '', result.message)
      }
      else if (result.isDenied) 
      {
        Swal.fire('Waiter Info not delete', '', 'info')
      }
    })
   }
  
    

    function displayAll() {
        return (
          <MaterialTable
            title="Waiters List"
            columns={[
              { title: 'RestaurantId', 
                render:rowData=><><div>{rowData.restaurantid}</div></>},
              { title: 'WaiterName/Gender/DOB', 
                render:rowData=><><div>{rowData.waitername}</div><div>{rowData.gender}</div><div>{rowData.dob}</div></> },
                { title: 'Contact',
                render:rowData=><><div>{rowData.mobileno}</div><div>{rowData.emailid}</div></> },
                { title: 'Address', 
              render:rowData=><><div>{rowData.address}</div></> },
             
             
              { title: 'Picture', 
              render:rowData=><div><img src={`${serverURL}/images/${rowData.picture}`}  style={{width:50,height:50,borderRadius:10}} /></div> },
              
              
            ]}
            data={listWaiters}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Waiter Info',
                onClick: (event, rowData) => handleEdit(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Waiter Info',
                onClick: (event, rowData) =>handleDelete(rowData) 
              },
              {
                icon: 'add',
                tooltip: 'Add Waiter',
                isFreeAction: true,
                onClick: (event, rowData) => navigate('/admindashboard/waitersinterface')
              }
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