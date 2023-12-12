import { useState,useEffect } from "react";
import { Avatar, Grid,TextField,Button,FormControl,InputLabel,Select,MenuItem,
    FormHelperText, FormLabel, RadioGroup,FormControlLabel,Radio, } from "@mui/material"
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

export default function SubCategoryInterface() {
 
    var classes = useStyles();

    var admin=JSON.parse(localStorage.getItem('ADMIN'))
  
    const [category,setCategory]=useState([]);

    const [restaurantId, setRestaurantId] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [foodItemName, setFoodItemName] = useState("");
    const [foodType, setFoodType] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [price, setPrice] = useState("");
    const [offerPrice, setOfferPrice] = useState("");
    const [fileIcon, setFileIcon] = useState({url:'',bytes:''});


    const [subcatError,setSubCatError]=useState({})


    const handleError = (error, input,message) => {
      setSubCatError(prevState => ({...prevState, [input]:{'error':error,'message':message}}));
      console.log("CC",subcatError)
     };


const validation=()=>{
  var submitRecord=true
  if(restaurantId.length==0)
  {
   handleError(true,'restaurantId',"Pls Input Restaurant Id")
    
   submitRecord=false
  }

  if(!categoryId)
  {
   handleError(true,'categoryId',"Pls Select Category Id")
    
   submitRecord=false
  }

  if(!foodItemName)
  {
   handleError(true,'foodItemName',"Pls Input Food Item Name")
    
   submitRecord=false
  }
 
  if(!foodType)
  {
   handleError(true,'foodType',"Pls Select Food Type")
    
   submitRecord=false
  }
 
  if(!ingredients)
  {
   handleError(true,'ingredients',"Pls Input Ingredients")
    
   submitRecord=false
  }
 
  if(!price)
  {
   handleError(true,'price',"Pls Input Price")
    
   submitRecord=false
  }
 
  if(!offerPrice)
  {
   handleError(true,'offerPrice',"Pls Input Offer Price")
    
   submitRecord=false
  }

  if(!fileIcon.url)
  {
   handleError(true,'fileIcon',"Pls Upload Icon")
    
   submitRecord=false
  }
    return submitRecord
}


const fetchAllCategory=async()=>{
  var result=await postData('category/fetch_all_category',{restaurantid:admin.restaurantid})
  setCategory(result.data);
}

useEffect(function(){
  fetchAllCategory()
  setRestaurantId(admin.restaurantid)
},[])


const fillCategory=()=>{
  return category.map((item)=>{
    return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
  });
}

const handleIcon=(event)=>{
   setFileIcon({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]}) 
}

const handleSubmit=async()=>{ 
  var error=validation()
  console.log("After Submit:",subcatError)
 if(error)
 {
var formData=new FormData()
formData.append('restaurantid',restaurantId)
formData.append('categoryid',categoryId)
formData.append('fooditemname',foodItemName)
formData.append('foodtype',foodType)
formData.append('ingredients',ingredients)
formData.append('price',price)
formData.append('offerprice',offerPrice)
formData.append('fileicon',fileIcon.bytes)


var result=await postData ('subcategory/subcategory_submit',formData)

if(result.status)
{
  Swal.fire({
    icon: 'success',
    title: 'Food Item Register',
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
            <Heading title={"Food Item Register"} myroute={'/admindashboard/displayallsubcategory'} />
          </Grid>

          <Grid item xs={6}>
            <TextField  
         disabled
           value={restaurantId}
            label="Restaurant Id" fullWidth />
          </Grid>


          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Ctaegory Name</InputLabel>
              <Select
               onFocus={()=>handleError(false,'restaurantId','')}
               error={subcatError?.categoryId?.error}
               onChange={(event)=>setCategoryId(event.target.value)} 
               helperText={subcatError?.categoryId?.message}
               label="Category Name"
               value={categoryId}
              >

               <MenuItem>-Select Category-</MenuItem>
              {fillCategory()}
            </Select>
              <FormHelperText style={{color:'red'}}>{subcatError?.categoryId?.message}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
             onFocus={()=>handleError(false,'foodItemName','')}
             error={subcatError?.foodItemName?.error}
             helperText={subcatError?.foodItemName?.message}
              onChange={(event) => setFoodItemName(event.target.value)}
              label="Food Item Name"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Food Type</FormLabel>
                <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onFocus={()=>handleError(false,'foodType','')}
               error={subcatError?.foodType?.error}
               helperText={subcatError?.foodType?.message}
               onChange={(event) => setFoodType(event.target.value)}
                >
            < FormControlLabel value="Veg" control={<Radio />} label="Veg" />
            < FormControlLabel value="Non-Veg" control={<Radio />} label="Non-Veg" />
                </RadioGroup>
                <FormHelperText style={{color:'red'}}>{subcatError?.foodType?.message}</FormHelperText>
            </FormControl>
          </Grid>


          <Grid item xs={12}>
            <TextField
             onFocus={()=>handleError(false,'ingredients','')}
             error={subcatError?.ingredients?.error}
             helperText={subcatError?.ingredients?.message}
              onChange={(event) => setIngredients(event.target.value)}
              label="Ingredients"
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
             onFocus={()=>handleError(false,'price','')}
             error={subcatError?.price?.error}
             helperText={subcatError?.price?.message}
              onChange={(event) => setPrice(event.target.value)}
              label="Price "
              fullWidth
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
             onFocus={()=>handleError(false,'offerPrice','')}
             error={subcatError?.offerPrice?.error}
             helperText={subcatError?.offerPrice?.message}
              onChange={(event) => setOfferPrice(event.target.value)}
              label=" Offer Price"
              fullWidth
            />
          </Grid>

          <Grid item xs={4}>
           <Button  component="label" variant="contained"  endIcon={<UploadFile />} fullWidth>
           <input 
            onFocus={()=>handleError(false,'fileIcon','')}
           onChange={handleIcon}
            hidden  accept="image/*"
           multiple type="file"  />
            Upload Icon
           </Button>
           {
            subcatError?.fileIcon?.error?<div style={{color:'red',fontSize:'0.8rem', paddingLeft:5 ,  margin:5}}>{subcatError?.fileIcon?.message}</div>:<></>
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