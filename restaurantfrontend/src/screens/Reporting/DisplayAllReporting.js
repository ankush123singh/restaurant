import { makeStyles } from "@mui/styles";
import {useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {serverURL, postData, getData } from '../../services/FetchNodeServices'
import MaterialTable from "@material-table/core"
import { useNavigate } from "react-router-dom";


import {Grid, Button } from '@mui/material';

import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"; 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const useStyles = makeStyles({
  root: {
    width:"auto",
    height:"auto",
    background:"#dfe4ea",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    flexDirection:'column',
    padding:10
  },

  box:{
    width:"85%",
    height:"40%",
    borderRadius:10,
    background:"#fff",
    padding:15,
   marginBottom:10
  },

  rootdisplay: {
    width: "100%",
    height: "100vh",
    background: "#dfe4ea",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  boxdisplay: {
    width:"85%",
    height: "auto",
    borderRadius: 10,
    background: "#fff",
    padding: 15,
  }

})








export default function DisplayAll()


{  var classes = useStyles();
  var admin=JSON.parse(localStorage.getItem('ADMIN'))
  const navigate=useNavigate()

    const getCurrentDate=()=>{
      var date=new Date()
     var cd=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
   return cd
  }


  const [listtable,setListTable]=useState([])
  const [fromDate,setFromDate]=useState(getCurrentDate()) 
  const [toDate,setToDate]=useState(getCurrentDate())
  const [totalAmount,setTotalAmount]=useState(0)
  

  const handleFromDate=(event)=>{
    const m=String(Number(event.$M)+1);
    const d=String(event.$D);
    const y=String(event.$y);
    setFromDate(y+"-"+m+"-"+d);   
  } 
  
  const handleToDate=(event)=>{
    const m=String(Number(event.$M)+1);
    const d=String(event.$D);
    const y=String(event.$y);
    setToDate(y+"-"+m+"-"+d);   
  } 

  const  handleSearch=()=>{
    fetchAllBill()
    fetchTotalAmount()
  }

  const fetchTotalAmount=async()=>{
    alert('yyyy',result)
    var body={fromdate:fromDate,todate:(toDate || getCurrentDate()) }
    var result=await postData('billing/fetch_total',body)
    setTotalAmount(result.data)
  }


  const fetchAllBill=async()=>{
    
    var body={fromdate:fromDate,todate:(toDate || getCurrentDate()) }
    var result=await postData('billing/fetch_all_bill',body)
    setListTable(result.data)
                                                                                                                                                                  
  }
 
 
  useEffect(function(){
    fetchAllBill()
    fetchTotalAmount()
    },[])





  
    return(
      <div className={classes.root}  >
        <div className={classes.box} >
       <Grid container spacing={3} style={{display:'flex',alignItems:'center'}}>

       <Grid item xs={3} style={{display:'flex',alignItems:'center',flexDirection:'column',fontFamily:'kanit',fontSize:18,fontWeight:'bold'}}>
        <div>
          Total Sales
        </div>
        <div style={{fontSize:24}}>
          &#8377;{parseFloat(totalAmount.totalbill).toFixed(2)}
        </div >
       </Grid>

        <Grid item xs={3}>

       <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker', 'DatePicker']}>        
                <DatePicker
                  label="From Date "
                  format="DD-MM-YYYY"
                  onChange={handleFromDate}
                  defaultValue={dayjs(getCurrentDate())}
                  fullWidth
                            />
           </DemoContainer>
       </LocalizationProvider>
    </Grid>

    <Grid item xs={3}>
       <LocalizationProvider dateAdapter={AdapterDayjs}>
       <DemoContainer components={['DatePicker', 'DatePicker']}>        
                <DatePicker
                  label="To Date "
                  format="DD-MM-YYYY"
                  onChange={handleToDate}
                  defaultValue={dayjs(getCurrentDate())}
                  fullWidth
                            />
           </DemoContainer>
       </LocalizationProvider>
    </Grid>

    <Grid item xs={3} fullWidth style={{display:'flex',flexDirection:'row',justifyContent:'center'}} >
    <Button  onClick={handleSearch} variant="contained" color="secondary" fullWidth >Show Bill</Button>
   </Grid>

    </Grid>
    </div>

    <div className={classes.boxdisplay}>
        {displayAll()}
    
   </div>

</div>)
  



       
 
        


    function displayAll(){
    return (
    <MaterialTable
      title="All Sales"
      columns={[
        { title: 'BillNo', field: 'billno' },
        { title: 'BillDate/Time',
        render:rowData=><><div>{rowData.billdate}</div><div>{rowData.billtime}</div></>}, 
        { title: 'CustomerName/Mob',
        render:rowData=><><div>{rowData.customername}</div><div>{rowData.mobileno}</div></>},
        { title: 'TableNo', field: 'tableno' },
        { title: 'Server', field: 'server' },
        { title: 'TotalAmount',
        render:rowData=><><div>&#8377;{rowData.totalamount}</div></> },
      ]}
        
      data={listtable}

    />
  )

    }
       


    }

  








