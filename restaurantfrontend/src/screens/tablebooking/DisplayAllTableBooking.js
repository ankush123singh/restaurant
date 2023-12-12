import {useState,useEffect} from 'react'
import MaterialTable from "@material-table/core"
import {  Grid,TextField,Button,FormControl,InputLabel,Select,MenuItem,FormHelperText, } from "@mui/material"
import { makeStyles } from "@mui/styles";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Heading from "../../components/heading/Heading";

import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

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
         padding:10,
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
export default function DisplayAllTableBooking()
{  var classes = useStyles();
  var admin=JSON.parse(localStorage.getItem('ADMIN'))
  const navigate=useNavigate()
  const [listTable,setListTable]=useState([])
  const [open,setOpen]=useState(false)
////////////////////////  Table data  //////////////////////////////////

const [restaurantId, setRestaurantId] = useState("");

const [tableId, setTableId] = useState("");

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
  
    if(!restaurantId)
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



const handleSubmit=async()=>{ 
var error=validation()
 console.log("After Submit:",tabError)
if(error)
{
    var body={'restaurantid':restaurantId,'tableno':tableNo,
    'noofchairs':noofChairs,'floor':floor,tableid:tableId}




    var result=await postData ('tablebooking/tablebooking_edit_data',body)

    if(result.status)
    {
      Swal.fire({
        icon: 'success',
        title: 'Table Booking Register',
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
    fetchAllTableBooking()
    }


///////////////////////////////////////////////////////////////////////////



  const fetchAllTableBooking=async()=>{
var result=await postData('tablebooking/fetch_all_tablebooking',{restaurantid:admin.restaurantid})

setListTable(result.data)
  }




const handleEdit=(rowData)=>{

    setRestaurantId(rowData.restaurantid)

    setTableId(rowData.tableid)

    setTableNo(rowData.tableno)

    setNoofChairs(rowData.noofchairs)

   setFloor(rowData.floor)
    
   

setOpen(true)

}
const handleDialogClose=()=>{
   setOpen(false) 
}

const showData=()=>{

    return(
        < div className={classes.root}>
            <div className={classes.box}>
    
       < Grid container spacing={2}>
       <Grid item xs={12}>
            <Heading title={"Table Booking Register"} />
          </Grid>
    
              <Grid item xs={6}>
                <TextField  
                  onFocus={()=>handleError(false,'restaurantId','')}
                  error={tabError?.restaurantId?.error}
                  helperText={tabError?.restaurantId?.message}
                onChange={(event) => setRestaurantId(event.target.value)} 
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
                  value={tableNo}
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
                  value={noofChairs}
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
fetchAllTableBooking()

  },[])

  const handleDelete=async(rowData)=>{
   
    Swal.fire({
      title: 'Do you want to Cancel the Booking?',
      showDenyButton: true,
      
      confirmButtonText: 'Cancel',
      denyButtonText: `Don't Cancel`,
    }).then(async(result) => {
      if (result.isConfirmed) {
        var body={'tableid':rowData.tableid}
        var result=await postData('tablebooking/tablebooking_delete',body)
       if(result.status)
       { Swal.fire('Cancelled!', '', result.message)
     fetchAllTableBooking()
      }
       else
        Swal.fire('Fail!', '', result.message)
      }
      else if (result.isDenied) 
      {
        Swal.fire('Booking  not cancel', '', 'info')
      }
    })
   }
    function displayAll() {
        return (
          <MaterialTable
            title="Table Booking List"
            columns={[
              {  title: 'RestaurantId', 
            render:rowData=><><div>{rowData.restaurantid}</div></>},
              { title: 'Table No.', 
              render:rowData=><><div>{rowData.tableno}</div></> },
              { title: 'No. Of Chairs', 
              render:rowData=><><div>{rowData.noofchairs}</div></> },
              { title: 'Booking Area', 
              render:rowData=><><div>{rowData.floor}</div></> },
             
            ]}
            data={listTable}
              
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Booking',
                onClick: (event, rowData) => handleEdit(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Cancel Booking',
                onClick: (event, rowData) => handleDelete(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add Booking',
                isFreeAction: true,
                onClick: (event, rowData) => navigate('/admindashboard/tablebookinginterface')
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