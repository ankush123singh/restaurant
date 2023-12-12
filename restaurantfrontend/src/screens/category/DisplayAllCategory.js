import {useState,useEffect} from 'react'
import MaterialTable from "@material-table/core"
import { makeStyles } from "@mui/styles";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Heading from "../../components/heading/Heading";

import { Avatar, Grid,TextField,Button } from "@mui/material"

import UploadFile from "@mui/icons-material/UploadFile";
import Swal from 'sweetalert2'
import { navigate, useNavigate } from "react-router-dom";

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
      width:"70%",
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
         padding:15,
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
export default function DisplayAllCategory()
{  var classes = useStyles();
  var admin=JSON.parse(localStorage.getItem('ADMIN'))
  const navigate=useNavigate()

  const [listCategory,setListCategory]=useState([])
  const [open,setOpen]=useState(false)
  
////////////////////////  Category data  //////////////////////////////////

const [restaurantId, setRestaurantId] = useState("");

const [categoryId, setCategoryId] = useState("");

const [categoryName, setCategoryName] = useState("");

const [fileIcon, setFileIcon] = useState({url:'',bytes:''});

const [tempFile,setTempFile]=useState({icon:''})

const [catError,setCatError]=useState({})

const [btnStatus,setBtnStatus]=useState(false)

const handleError = (error, input,message) => {
    setCatError(prevState => ({...prevState, [input]:{'error':error,'message':message}}));
    console.log("CC",catError)
   };


const validation=()=>
{  var submitRecord=true

    if(!restaurantId)
    {
     handleError(true,'restaurantId',"Pls Input Restaurant Id")
      
     submitRecord=true
    }

if(!categoryName)
{
 handleError(true,'categoryName',"Pls Input Category Name")
  
 submitRecord=false
}

if(!fileIcon.url)
{
 handleError(true,'fileIcon',"Pls Upload Icon")
  
 submitRecord=false
}
  return submitRecord
}


const handleIcon=(event)=>{
    setFileIcon({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]}) 
setBtnStatus(true)
}
const handleSubmit=async()=>{ 
var error=validation()
 console.log("After Submit:",catError)
if(error)
{
var body={'categoryname':categoryName,'restaurantid':restaurantId,
    categoryid:categoryId }




var result=await postData('category/category_edit_data',body)

if(result.status)
{
Swal.fire({
  icon: 'success',
  title: 'Category Register',
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
fetchAllCategory()
}



///////////////////////////////////////////////////////////////////////////

const handleCancel=()=>{
   setBtnStatus(false)
   setFileIcon({url:tempFile.icon,bytes:''})
    
}

const editImage=async()=>{
var formData=new FormData()
formData.append('categoryid',categoryId)
formData.append('icon',fileIcon.bytes)
var result=await postData('category/category_edit_icon',formData)

if(result.status)
{
  Swal.fire({
    icon: 'success',
    title: 'Category Registration',
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
fetchAllCategory()
setBtnStatus(false)
}

const editDeleteButton=()=>{
    return(
        <div>
         <Button onClick={editImage}>Edit</Button>
         <Button onClick={handleCancel}>Cancel</Button>
         </div>   
    )
}



  const fetchAllCategory=async()=>{
  var result=await postData('category/fetch_all_category',{restaurantid:admin.restaurantid})
  setListCategory(result.data)
  }


const handleEdit=(rowData)=>{

    setRestaurantId(rowData.restaurantid)

    setCategoryId(rowData.categoryid)

    setCategoryName(rowData.categoryname)
    
    setFileIcon({url:`${serverURL}/images/${rowData.icon}`,bytes:''})

   setTempFile({icon:`${serverURL}/images/${rowData.icon}`})

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
            <Heading title={" Category Register"} />
          </Grid>

          <Grid item xs={12}>
            <TextField  
              onFocus={()=>handleError(false,'restaurantId','')}
              error={catError?.restaurantId?.error}
              helperText={catError?.restaurantId?.message}
            onChange={(event) => setRestaurantId(event.target.value)} 
            label="Restaurant Id" fullWidth 
            value={restaurantId}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField  
             onFocus={()=>handleError(false,'categoryName','')}
             error={catError?.categoryName?.error}
             helperText={catError?.categoryName?.message}
            onChange={(event) => setCategoryName(event.target.value)}
            label="Category Name" fullWidth
            value={categoryName}
            />
          </Grid>

          <Grid item xs={4}>
           
           <Button  component="label" variant="contained"  endIcon={<UploadFile />} fullWidth>
           <input 
            onFocus={()=>handleError(false,'fileIcon','')}
           onChange={handleIcon}
            hidden  accept="image/*"
           type="file"  />
            Upload Icon
           </Button>
           {
            catError?.fileIcon?.error?<div style={{color:'red',fontSize:'0.8rem', paddingLeft:5 ,  margin:5}}>{catError?.fileIcon?.message}</div>:<></>
            }
          </Grid>

          <Grid item xs={8}></Grid>
          < Grid item xs={4} className={classes.center} >
          <Avatar 
              variant="rounded"
              alt="Remy Sharp"
              src={fileIcon.url}
              sx={{ width: 56, height: 56 }}
            />
            <div>
                {btnStatus?editDeleteButton():<></>}
            </div>
           </Grid>
          <Grid item xs={8}></Grid>

         
         


          </Grid>
       </div>
        </div>
    )

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
fetchAllCategory()

  },[])

  const handleDelete=async(rowData)=>{
   
    Swal.fire({
      title: 'Do you want to delete the record?',
      showDenyButton: true,
      
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then(async(result) => {
      if (result.isConfirmed) {
        var body={'categoryid':rowData.categoryid}
        var result=await postData('category/category_delete',body)
       if(result.status)
       { Swal.fire('Deleted!', '', result.message)
     fetchAllCategory()
      }
       else
        Swal.fire('Fail!', '', result.message)
      }
      else if (result.isDenied) 
      {
        Swal.fire('Category  not delete', '', 'info')
      }
    })
   }
    function displayAll() {
        return (
          <MaterialTable
            title="Category List"
            columns={[
              {  title: 'RestaurantId', 
            render:rowData=><><div>{rowData.restaurantid}</div></>},
              { title: 'CategoryName', 
              render:rowData=><><div>{rowData.categoryname}</div></> },
              { title: 'Icon', 
              render:rowData=><div><img src={`${serverURL}/images/${rowData.icon}`}  style={{width:50,height:50,borderRadius:10}} /></div>  },
            ]}
            data={listCategory}
              
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Category',
                onClick: (event, rowData) => handleEdit(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Category',
                onClick: (event, rowData) => handleDelete(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add Category',
                isFreeAction: true,
                onClick: (event, rowData) => navigate("/admindashboard/categoryinterface")
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