  import LoginPage from "./screens/superadmin/LoginPage";
  import Dashboard from "./screens/superadmin/Dashboard";
import AdminLogin from "./screens/admin/AdminLogin"
import AdminDashboard from "./screens/admin/AdminDashboard"
import FoodBooking from "./screens/FoodBooking/FoodBooking"
import DisplayAllReporting from "./screens/Reporting/DisplayAllReporting"

import RestaurantInterface from "./screens/restaurant/RestaurantInterface";
import DisplayAllRestaurant from "./screens/restaurant/DisplayAllRestaurant";

  import { BrowserRouter as Router,Route,Routes } from "react-router-dom";

function App() {
  return(<div>
 <Router>
  <Routes>
  
   <Route element={<LoginPage/>} path='/loginpage' />
    <Route element={<Dashboard/>} path='/dashboard/*' />

    <Route element={<AdminLogin/>} path='/adminlogin' />
    <Route element={<AdminDashboard/>} path='/admindashboard/*' />

<Route element={<FoodBooking/>} path='/foodbooking' />

<Route element={<RestaurantInterface/>} path='/restaurantinterfae' />
<Route element={<DisplayAllRestaurant/>} path='/displayallrestaurant' />

<Route element={<DisplayAllReporting/>} path='/displayallreporting' />

  </Routes>
 </Router>
  </div>)

}

export default App;
