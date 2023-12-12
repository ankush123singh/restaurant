import Chart from "../../components/DashboardComponent/Chart"
import Deposits from "../../components/DashboardComponent/Deposits"
import Orders from "../../components/DashboardComponent/Orders"
import { Grid,Paper } from "@mui/material"
import {useState,useEffect} from 'react'


export default function Summary(props)
{
    

  return(<div>
    {/* Chart */}
    <Grid container spacing={3}>
    <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>

    
           {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                <Deposits />
                </Paper>
              </Grid>

               {/* Recent Orders */}
               <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

                <Orders />
                </Paper>
              </Grid>

          </Grid>    

  </div>)

}

/*
          <Grid item xs={3} style={{display:'flex',alignItems:'center',flexDirection:'column',fontFamily:'kanit',fontSize:18,fontWeight:'bold'}}>
        <div>
          Total Sales
        </div>
        <div style={{fontSize:24}}>
          &#8377;{totalAmount.totalbill}
        </div >
       </Grid>

*/
