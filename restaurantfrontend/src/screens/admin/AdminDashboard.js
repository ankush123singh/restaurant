
import {Avatar,Paper,Grid,AppBar,Toolbar,Box,Typography} from '@mui/material';
import { makeStyles } from "@mui/styles";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import DraftsIcon from '@mui/icons-material/Drafts';
import DashboardIcon from '@mui/icons-material/Dashboard'



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

import FoodBooking from "../FoodBooking/FoodBooking";

import DisplayAllReporting from '../Reporting/DisplayAllReporting';

import Summary from './Summary';
import Chart from "../../components/DashboardComponent/Chart";

import { Route,Routes,Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { serverURL } from '../../services/FetchNodeServices';
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
    height: "auto",
    borderRadius: 10,
    background: "#fff",
    padding: 15,
    boxShadow:"0 0 15px #222"
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
   marginBottom:2,
   color:'black'
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
   marginInline:'2px',
   fontFamily:'kanit',
   fontWeight:'bold'
   
   },
   menuItemStyle:{
    fontFamily:'Kanit',
    fontSize:14,
    fontWeight:'bold',
    
   }

});
export default function Dashboard(props){
   var classes=useStyles()
   var navigate=useNavigate()
   var admin=JSON.parse(localStorage.getItem('ADMIN'))
   
const handleLogout=()=>{
  localStorage.clear()
  navigate('/adminlogin')
}

  return(
    <Box  sx={{ flexGrow: 1 }}>
    <AppBar position="sticky">
      <Toolbar variant="dense">
        
        <Typography variant="h6" color="inherit" component="div">
          {admin.restaurantname}
        </Typography>
      </Toolbar>
    </AppBar>
    <Grid container spaces={3} >
      <Grid item xs={2} style={{ marginTop: 50}}>
        <Paper className={classes.leftBarStyle}>
          <img src={`${serverURL}/images/${admin.filelogo}`}   width='100'/>
          <div className={classes.nameStyle}>{admin.ownername}</div>
          <div className={classes.emailStyle}>{admin.emailid}</div>
          <div className={classes.phoneStyle}>+91{admin.mobileno}</div>

      <div className={classes.menuStyle}>
      
        <List>
        
         <Divider />
         
        <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/admindashboard/summary')}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Dashboard</span>} />
            </ListItemButton>
          </ListItem>


          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/admindashboard/displayallcategory')}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Category List</span>} />
            </ListItemButton>
          </ListItem>
         
          

          <ListItem disablePadding>
           <ListItemButton onClick={()=>navigate('/admindashboard/displayallsubcategory')}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Food Items list </span>} />
            </ListItemButton>
          </ListItem>



          <ListItem disablePadding>
           <ListItemButton onClick={()=>navigate('/admindashboard/displayalltablebooking')}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Table  List </span>} />
            </ListItemButton>
          </ListItem>

        

          <ListItem disablePadding>
           <ListItemButton onClick={()=>navigate('/admindashboard/displayallwaiters')}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Waiters List </span>} />
            </ListItemButton>
          </ListItem>

        

          <ListItem disablePadding>
           <ListItemButton onClick={()=>navigate('/admindashboard/displayallwaitertable')}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Waiter Table List </span>} />
            </ListItemButton>
          </ListItem>


          <ListItem disablePadding>
           <ListItemButton onClick={()=>navigate('/admindashboard/foodbooking')}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Billing</span>} />
            </ListItemButton>
          </ListItem>



          <ListItem disablePadding>
           <ListItemButton onClick={()=>navigate('/admindashboard/displayallreporting')}>
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary={<span className={classes.menuItemStyle}>Sales Reporting</span>} />
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

      <Grid item xs={9.8} style={{padding:20}}>
     

      <Routes>
         
        <Route path="/" element={<Navigate to="/admindashboard/Summary" replace={true} />}/>

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

          <Route element={<FoodBooking/>} path='/foodbooking' />
          <Route element={<DisplayAllReporting/>} path='/displayallreporting' />

          <Route element={<Summary/>} path="/summary" />

       </Routes>  
      </Grid>

    </Grid>
  </Box>
  )

}