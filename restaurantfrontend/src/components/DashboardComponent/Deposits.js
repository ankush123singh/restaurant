import React,{useEffect,useState} from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { postData } from '../../services/FetchNodeServices';
import { Grid,Paper } from "@mui/material"

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {

    const getCurrentDate=()=>{
        var date=new Date()
       var cd=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()
     return cd
    }

    const getCurrentDateString=()=>{
        const date=new Date()
        const m=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        const d=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

        const cd=d[date.getDay()]+","+m[date.getMonth()]+" "+date.getDate()+" "+date.getFullYear()
     return cd
    }

    const [totalAmount,setTotalAmount]=useState(0)

    

    const fetchTotalAmount=async()=>{
        var body={todaysdate:getCurrentDate() }
        var result=await postData('billing/fetch_todays_total',body)
        setTotalAmount(result.data)
      }
    
      useEffect(function(){
        
        fetchTotalAmount()
        },[])


  return (
    <React.Fragment>
     <div  style={{  fontSize:20,color:'blue', paddingBottom:10}}> Today's Sale </div>
      <Typography component="p" variant="h4">
      
          &#8377;{parseFloat(totalAmount.totalbill).toFixed(2)}
      
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
       on{getCurrentDateString()}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}