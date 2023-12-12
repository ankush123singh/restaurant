import {useState} from 'react';
import {Avatar,Paper,Grid,AppBar,Toolbar,Box,Typography} from '@mui/material';
import { makeStyles } from "@mui/styles";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';

import RestaurantInterface from "../restaurant/RestaurantInterface"
import DisplayAllRestaurant from "../restaurant/DisplayAllRestaurant"

import CategoryInterface from  "../category/CategoryInterface"
import DisplayAllCategory from  "../category/DisplayAllCategory"

import SubCategoryInterface  from  "../subcategory/SubCategoryInterface"
import DisplayAllSubCategory from "../subcategory/DisplayAllSubCategory"

import TableBookingInterface from "../tablebooking/TableBookingInterface";
import DisplayAllTableBooking from "../tablebooking/DisplayAllTableBooking";

import WaitersInterface from "../waiters/WaitersInterface";
import DisplayAllWaiters from "../waiters/DisplayAllWaiters";

import WaitertableInterface from "../waitertable/WaitertableInterface";
import DisplayAllWaitertable from "../waitertable/DisplayAllWaitertable";

import { Route,Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { serverURL } from '../../services/FetchNodeServices';
const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "100vh",
    background: "#dfe4ea",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "60%",
    height: "auto",
    borderRadius: 10,
    background: "#fff",
    padding: 15,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    
  },
  leftBarStyle:{
    padding:5,
    display: "flex",
    flexDirection:'column',
    justifyContent: "center",
    alignItems: "center",
    margin:10,


  },
  nameStyle:{
   fontFamily:'Kanit',
   fontSize:16,
   fontWeight:'bold',
   marginTop:5,
   marginBottom:2

  },
  phoneStyle:{
    fontFamily:'Kanit',
    fontSize:12,
    fontWeight:'bold',
   
    color:'#636e72'
 
   },
   emailStyle:{
    fontFamily:'Kanit',
    fontSize:12,
    fontWeight:'bold',
    
    color:'#636e72'
   },
   menuStyle:{
    fontFamily:'Kanit',
    fontSize:18,
    fontWeight:'bold',
    display:'flex',
    justifyContent:'left',
    width:250,
   


   },
   menuItemStyle:{
    fontFamily:'Kanit',
    fontSize:16,
    fontWeight:'bold',
    
   }

});
export default function Dashboard(props){
   var classes=useStyles()
   var navigate=useNavigate()
   var sa=JSON.parse(localStorage.getItem('SUPER'))
const handleLogout=()=>{
  localStorage.clear()
  navigate('/loginpage')
}

  return(
    <Box >
    <AppBar position="fixed">
      <Toolbar variant="dense">
        
        <Typography variant="h6" color="inherit" component="div">
          Super Admin
        </Typography>
      </Toolbar>
    </AppBar>
    <Grid container spaces={3} >
      <Grid item xs={2} style={{ marginTop: 50}}>
        <Paper className={classes.leftBarStyle}>
          <Avatar src={`${serverURL}/images/${sa.picture}`} variant="circular"  style={{width:80,height:80}} />
          <div className={classes.nameStyle}>{sa.superadminname}</div>
          <div className={classes.emailStyle}>{sa.emailid}</div>
          <div className={classes.phoneStyle}>+917440685358</div>

      <div className={classes.menuStyle}>
      
        <List>
        
          <ListItem disablePadding >
            <ListItemButton onClick={()=>navigate('/dashboard/restaurantinterface')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Add restaurant</span>} />
            </ListItemButton>
          </ListItem>
         

          
          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/dashboard/displayallrestaurant')}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Restaurant List</span>} />
            </ListItemButton>
          </ListItem>
         
         
          <ListItem disablePadding>
           <ListItemButton onClick={()=>navigate('/dashboard/categoryinterface')}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Add Category </span>} />
            </ListItemButton>
          </ListItem>
         

          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/dashboard/displayallcategory')}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Category List</span>} />
            </ListItemButton>
          </ListItem>
         
          <ListItem disablePadding>
           <ListItemButton onClick={()=>navigate('/dashboard/subcategoryinterface')}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Add Food Items </span>} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
           <ListItemButton onClick={()=>navigate('/dashboard/displayallsubcategory')}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Food Items list </span>} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
           <ListItemButton onClick={()=>navigate('/dashboard/tablebookinginterface')}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Add Table Booking </span>} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
           <ListItemButton onClick={()=>navigate('/dashboard/displayalltablebooking')}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Table Booking List </span>} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
           <ListItemButton onClick={()=>navigate('/dashboard/waitersinterface')}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Add Waiters </span>} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
           <ListItemButton onClick={()=>navigate('/dashboard/displayallwaiters')}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Waiters List </span>} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
           <ListItemButton onClick={()=>navigate('/dashboard/waitertableinterface')}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Add Waiter Table </span>} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
           <ListItemButton onClick={()=>navigate('/dashboard/displayallwaitertable')}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Waiter Table List </span>} />
            </ListItemButton>
          </ListItem>

           <Divider variant='inset'  />
          
            
  
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Logout</span>} />
            </ListItemButton>
          </ListItem>


        </List>
       
     
      </div>
    
      </Paper> 
      </Grid>

      <Grid item xs={10} style={{padding:25,background: "#dfe4ea",height:'auto'}}>
      <Routes>
         <Route element={<RestaurantInterface/>} path='/restaurantinterface' />
         <Route element={<DisplayAllRestaurant/>} path='/displayallrestaurant' />

         <Route element={<CategoryInterface/>} path='/categoryinterface' />
         <Route element={<DisplayAllCategory/>} path='/displayallcategory' />

         <Route element={<SubCategoryInterface/>} path='/subcategoryinterface' />
         <Route element={<DisplayAllSubCategory/>} path='/displayallsubcategory' />
   
         <Route element={<TableBookingInterface/>} path='/tablebookinginterface' />
         <Route element={<DisplayAllTableBooking/>} path='/displayalltablebooking' />

         <Route element={<WaitersInterface/>} path='/waitersinterface' />
         <Route element={<DisplayAllWaiters/>} path='/displayallwaiters' />

         <Route element={<WaitertableInterface/>} path='/waitertableinterface' />
          <Route element={<DisplayAllWaitertable/>} path='/displayallwaitertable' />


       </Routes>  
      </Grid>

    </Grid>
  </Box>
  )

}