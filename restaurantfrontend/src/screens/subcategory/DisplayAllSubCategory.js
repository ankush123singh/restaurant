import {useState,useEffect} from 'react'
import MaterialTable from "@material-table/core"
import { makeStyles } from "@mui/styles";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
 
import { Snackbar, Avatar, Grid,TextField,Button,Select,
    FormHelperText, FormLabel, RadioGroup,FormControlLabel,Radio, } from "@mui/material"

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import UploadFile from "@mui/icons-material/UploadFile";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { serverURL, getData, postData} from "../../services/FetchNodeServices";
import Heading from "../../components/heading/Heading";


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
    width: "90%",
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
export default function DisplayAllSubCategory()
{  var classes = useStyles();
   var admin=JSON.parse(localStorage.getItem('ADMIN'))
  const navigate=useNavigate()
    const [listSubCategory,setListSubCategory]=useState([])
    const [open,setOpen]=useState(false)

    //////////// Sub Category Data /////////////////////

    const [fooditemId, setFooditemId] = useState("");

    const [category,setCategory]=useState([]);

    const [restaurantId, setRestaurantId] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [foodItemName, setFoodItemName] = useState("");
    const [foodType, setFoodType] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [price, setPrice] = useState("");
    const [offerPrice, setOfferPrice] = useState("");
    const [fileIcon, setFileIcon] = useState({url:'',bytes:''});

    const [tempFile,setTempFile]=useState({icon:''})

    const [subcatError,setSubCatError]=useState({})

    const [btnStatus,setBtnStatus]=useState(false)

    const handleError = (error, input,message) => {
        setSubCatError(prevState => ({...prevState, [input]:{'error':error,'message':message}}));
        console.log("CC",subcatError)
       };
  
  
  const validation=()=>{
    var submitRecord=true

    if(!restaurantId)
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
},[])

   const handleIcon=(event)=>{
    setFileIcon({url:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]}) 
    setBtnStatus(true) 
} 


const fillCategory=()=>{
  return category.map((item)=>{
    return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
  });
}

 const handleSubmit=async()=>{ 
    var error=validation()
    console.log("After Submit:",subcatError)
   if(error)
   {
  var body={'restaurantid':restaurantId,'categoryid':categoryId,
  'fooditemname':foodItemName,'foodtype':foodType,
  'ingredients':ingredients,'price':price,
  'offerprice':offerPrice,fooditemid:fooditemId}
  
  
  var result=await postData('subcategory/subcategory_edit_data',body)
  
  if(result.status)
  {
    Swal.fire({
      icon: 'success',
      title: 'Food Item Register',
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
  fetchAllSubCategory()
  }


    /////////////////////////////////////////////////////



   const handleCancel=()=>{
 
    setBtnStatus(false)
    setFileIcon({url:tempFile.icon,bytes:''})
   
 
   }


  const editImage=async()=>{
  
    var formData=new FormData()
    formData.append('fooditemid',fooditemId)
    formData.append('icon',fileIcon.bytes)
    var result=await postData('subcategory/subcategory_edit_icon',formData)
    if(result.status)
    {
      Swal.fire({
        icon: 'success',
        title: 'Food Item Registration',
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
 
fetchAllSubCategory()
 setBtnStatus(false) 
 
}
  


   const editDeleteButton=()=>{
    return(<div>
       < Button onClick={editImage}>Edit</Button>
       <Button onClick={handleCancel}>Cancel</Button>
    </div>)
   }






    const fetchAllSubCategory=async()=>{
     var result=await postData('subcategory/fetch_all_subcategory',{restaurantid:admin.restaurantid})
     setListSubCategory(result.data)
    }


   const handleEdit=(rowData)=>{
    
    setFooditemId(rowData.fooditemid)

    setRestaurantId(rowData.restaurantid)
    setCategoryId(rowData.categoryid)
    setFoodItemName(rowData.fooditemname)
    setFoodType(rowData.foodtype)
    setIngredients(rowData.ingredients)
    setPrice(rowData.price)
    setOfferPrice(rowData.offerprice)
  
    setFileIcon({url:`${serverURL}/images/${rowData.icon}`,bytes:''})
   
    setTempFile({icon:`${serverURL}/images/${rowData.icon}`})

    setOpen(true)

   }
   const handleDialogClose=()=>{
    setOpen(false)

    fetchAllSubCategory()
   }

  const showData=()=>{
    return (
      <div className={classes.root} >
        <div className={classes.box} >
        < Grid container spacing={2}>
        <Grid item xs={12}>
            <Heading title={"Food Item  Register"} />
          </Grid>


   <Grid item xs={6}>
            <TextField  
              onFocus={()=>handleError(false,'restaurantId','')}
              error={subcatError?.restaurantId?.error}
              helperText={subcatError?.restaurantId?.message}
            onChange={(event) => setRestaurantId(event.target.value)} 
            label="Restaurant Id" 
            value={restaurantId}
            fullWidth />
          </Grid>


    
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Ctaegory Name</InputLabel>
              <Select
            
               onChange={(event)=>setCategoryId(event.target.value)} 
           
               label="Category Name"
             value={categoryId}
              >

               <MenuItem>-Select Category-</MenuItem>
              {fillCategory()}
            </Select>
             
            </FormControl>
          </Grid>


          <Grid item xs={6}>
            <TextField
             onFocus={()=>handleError(false,'foodItemName','')}
             error={subcatError?.foodItemName?.error}
             helperText={subcatError?.foodItemName?.message}
              onChange={(event) => setFoodItemName(event.target.value)}
              label="Food Item Name"
              value={foodItemName}
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
               value={foodType}
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
              value={ingredients}
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
              value={price}
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
              value={offerPrice}
              fullWidth
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
                onFocus={()=>handleError(false,'fileIcon','')}
                onChange={handleIcon} hidden accept="image/*" multiple type="file" />
                Upload Icon
              </Button>
              {
              subcatError?.fileIcon?.error?<div style={{color:'red',fontSize:'0.8rem',margin:5}}>{subcatError?.fileIcon?.message}</div>:<></>
              }
              
             </Grid>
             <Grid item xs={8}></Grid>
            <Grid item xs={4} className={classes.center}>
              <Avatar
                variant="rounded"
                alt="Remy Sharp"
                src={fileIcon.url}
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
        fetchAllSubCategory()

    },[])

    const handleDelete=async(rowData)=>{
   
    Swal.fire({
      title: 'Do you want to delete the record?',
      showDenyButton: true,
      
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then(async(result) => {
      if (result.isConfirmed) {
        var body={'fooditemid':rowData.fooditemid}
        var result=await postData('subcategory/subcategory_delete',body)
       if(result.status)
       { Swal.fire('Deleted!', '', result.message)
     fetchAllSubCategory()
      }
       else
        Swal.fire('Fail!', '', result.message)
      }
      else if (result.isDenied) 
      {
        Swal.fire('Food Item not delete', '', 'info')
      }
    })
   }
  
    

    function displayAll() {
        return (
          <MaterialTable
            title="Food Item List"
            columns={[
              { title: 'RestaurantId', 
                render:rowData=><><div>{rowData.restaurantid}</div></>},

                  { title: 'CategoryName', 
                  render:rowData=><><div>{rowData.categoryname}</div></>},

              { title: 'FoodName/Type', 
                render:rowData=><><div>{rowData.fooditemname}/{rowData.foodtype}</div></> },
              { title: 'Ingredients', 
              render:rowData=><><div>{rowData.ingredients}</div></> },
              { title: 'Price/Offer',
               render:rowData=><><s>{rowData.price}</s>/<>{rowData.offerprice}</></>},
             
              { title: 'Logo', 
              render:rowData=><div><img src={`${serverURL}/images/${rowData.icon}`}  style={{width:50,height:50,borderRadius:10}} /></div> },
              
              
            ]}
            data={listSubCategory}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Food Item',
                onClick: (event, rowData) => handleEdit(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Food Item',
                onClick: (event, rowData) =>handleDelete(rowData) 
              },
              {
                icon: 'add',
                tooltip: 'Add Food Item',
                isFreeAction: true,
                onClick: (event, rowData) => navigate('/admindashboard/subcategoryinterface')
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