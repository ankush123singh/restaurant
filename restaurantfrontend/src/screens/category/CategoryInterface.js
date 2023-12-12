import { useState,useEffect } from "react";
import { Avatar, Grid,TextField,Button } from "@mui/material"
import { makeStyles } from "@mui/styles";
import UploadFile from "@mui/icons-material/UploadFile";
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
        height: "60%",
        borderRadius: 10,
        background: "#fff",
        padding: 20,
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
})
export default function CategoryInterface(){ 
    var classes = useStyles();
    var admin=JSON.parse(localStorage.getItem('ADMIN'))

    const [restaurantId, setRestaurantId] = useState();
    const [categoryName, setCategoryName] = useState("");
    const [fileIcon, setFileIcon] = useState({url:'',bytes:''});

    const [catError,setCatError]=useState({})

   
    useEffect(function(){
      setRestaurantId(admin.restaurantid)
    },[])

    const handleError = (error, input,message) => {
      setCatError(prevState => ({...prevState, [input]:{'error':error,'message':message}}));
      console.log("CC",catError)
     };


const validation=()=>{
  var submitRecord=true
  if(restaurantId.length==0)
  {
   handleError(true,'restaurantId',"Pls Input Restaurant Id")
    
   submitRecord=false
  }

  if(categoryName.trim().length==0)
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
}
const handleSubmit=async()=>{ 
  var error=validation()
 // console.log("After Submit:",catError)
 if(error)
 {
var formData=new FormData()
formData.append('restaurantid',restaurantId)
formData.append('categoryname',categoryName)
formData.append('fileicon',fileIcon.bytes)


var result=await postData ('category/category_submit',formData)

if(result.status)
{
  Swal.fire({
    icon: 'success',
    title: 'Category Register',
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
            <Heading title={"Category Register"} myroute={'/admindashboard/displayallcategory'}/>
          </Grid>


          <Grid item xs={12}>
            <TextField  
             value={restaurantId}
             disabled
             label="Restaurant Id"
             fullWidth />
          </Grid>


          <Grid item xs={12}>
            <TextField  
             onFocus={()=>handleError(false,'categoryName','')}
             error={catError?.categoryName?.error}
             helperText={catError?.categoryName?.message}
            onChange={(event) => setCategoryName(event.target.value)}
            label="Category Name" fullWidth />
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
</Grid>
<Grid item xs={8}></Grid>

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
    )
}