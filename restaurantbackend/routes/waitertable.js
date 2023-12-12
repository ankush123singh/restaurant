var express = require('express');
var router = express.Router();
var pool=require("./pool")
/* GET home page. */


router.post('/waitertable_submit', function(req, res, next) {
    pool.query("insert into waitertable( restaurantid, waiterid, tableid, currentdate)values(?,?,?,?)",[req.body.restaurantid, req.body.waiterid, req.body.tableid, req.body.currentdate],function(error,result){
if (error)
{
    console.log(error)
    res.status(200).json({status:false,message:'Database Error'})
}
else
{
    res.status(200).json({status:true,message:' Waiter Table Added Successfully'})
}
    })

});


router.get('/fetch_all_waitertable',function(req,res){
    pool.query('select WT.*,(select W.waitername from waiters W where W.waiterid=WT.waiterid)as waitername,(select T.tableno from tablebooking T where T.tableid=WT.tableid) as tableno,(select T.floor from tablebooking T where T.tableid=WT.tableid) as floor from waitertable WT',function(error,result){
        if(error)
        {
            console.log(error)
            res.status(200).json({status:false,message:'Database Error',data:[]})
        
        }
        else
        {  console.log(result)
            res.status(200).json({status:true,data:result,message:'Waiter Table Booked Successfully'})
        }
    
    }) 
})


router.post('/waitertable_edit_data', function(req, res, next) {
    pool.query("update waitertable set  restaurantid=?, waiterid=?, tableid=?, currentdate=? where waitertableid=? ",[req.body.restaurantid, req.body.waiterid, req.body.tableid, req.body.currentdate, req.body.waitertableid],function(error,result){
if (error)
{
    console.log(error)
    res.status(200).json({status:false,message:'Database Error'})
}
else
{
    res.status(200).json({status:true,message:'Waiter Table  Updated Successfully'})
}
    })

});


router.post('/waitertable_delete', function(req, res, next) {
    pool.query("delete from waitertable  where waitertableid=?",[ req.body.waitertableid ],function(error,result){
    if(error)
    {
        console.log(error)
        res.status(200).json({status:false,message:'Database Error'})
    
    }
    else
    {
        res.status(200).json({status:true,message:'Waiter Table Cancelled Successfully'})
    }
    
    })
    });

module.exports=router