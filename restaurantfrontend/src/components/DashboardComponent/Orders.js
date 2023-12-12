import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MaterialTable from "@material-table/core"
import {useState,useEffect} from 'react'
import {serverURL, postData, getData } from '../../services/FetchNodeServices'

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {

  const getCurrentDate=()=>{
    var date=new Date()
   var cd=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
 return cd
}

  const [listtable,setListTable]=useState([])
  const [fromDate,setFromDate]=useState(getCurrentDate()) 
  const [toDate,setToDate]=useState(getCurrentDate())
 
 /* const [mobileno,setMobileno]=useState('')
  const [totalamount,setTotalAmount]=useState([])
  const [customername,setCategoryName]=useState([])
  const [billdate,setBilldate]=useState([])
  const [billtime,setBilltime]=useState([])  

  const [billno,setBillno]=useState('') */

  const fetchAllBill=async()=>{
    

    var body={fromdate:fromDate,todate:(toDate || getCurrentDate()) }
    var result=await postData('billing/fetch_all_todaybill',body)
    console.log('YYYYY',result)
    setListTable(result.data)
    
    
    
  }
 
 
  useEffect(function(){
    fetchAllBill()
   
    },[])


  return (
   
    
    
    <React.Fragment>

      <MaterialTable
      title={ <div style={{ fontSize:20,color:'blue', paddingBottom:10}}>Recent Orders</div>}
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
      options={{
          paging:true,
          pageSize:3,       // make initial page size
          emptyRowsWhenPaging: false,   // To avoid of having empty rows
          pageSizeOptions:[3,5,7],    // rows selection options
        }} 
    />

  
      
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
  
  </React.Fragment>
  )
}

/*   
<div style={{ fontSize:20,color:'blue', paddingBottom:10}}>Recent Orders</div>
<Table size="small">
        <TableHead>
          <TableRow>
          <TableCell>Billno</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Table No.</TableCell>
            <TableCell>Waiter</TableCell>
            <TableCell align="right">Total Amount</TableCell>
          </TableRow>
        </TableHead>

          <TableBody>
            <TableRow >

              <TableCell>{billno} </TableCell>
              
              <TableCell>billdate</TableCell>
              <TableCell>customername</TableCell>
              <TableCell>mobileno</TableCell>
              <TableCell>server</TableCell>
              <TableCell>{getCurrentDate()}</TableCell>
              <TableCell>totalamount</TableCell>

         
          
            </TableRow>
        </TableBody>

      </Table>
*/
