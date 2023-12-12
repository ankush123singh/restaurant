var express = require('express');
var router = express.Router();
var pool=require("./pool")
var upload=require("./multer")
/* GET home page. */



router.post('/subcategory_submit',upload.any(), function(req, res, next) {
    pool.query("insert into fooditems(restaurantid, categoryid, fooditemname, foodtype, ingredients, price, offerprice, icon)values(?,?,?,?,?,?,?,?)",[req.body.restaurantid, req.body.categoryid, req.body.fooditemname, req.body.foodtype, req.body.ingredients, req.body.price, req.body.offerprice, req.files[0].filename],function(error,result){
if (error)
{
    console.log(error)
    res.status(200).json({status:false,message:'Database Error'})
}
else
{
    res.status(200).json({status:true,message:' Food Item Added Successfully'})
}
    })

 });

router.post('/fetch_all_subcategory',function(req,res){
    pool.query('select F.*, (select C.categoryname from category C where C.categoryid=F.categoryid) as categoryname from fooditems F where F.restaurantid=?',[req.body.restaurantid],function(error,result){
        if(error)
        {
            console.log(error)
            res.status(200).json({status:false,message:'Database Error',data:[]})
        
        }
        else
        {  console.log(result)
            res.status(200).json({status:true,data:result,message:'Food Item Added Successfully'})
        }
    }) 
    })

  

    router.post('/subcategory_edit_data',upload.any(), function(req, res, next) {
        pool.query("update fooditems set restaurantid=?, categoryid=?, fooditemname=?, foodtype=?, ingredients=?, price=?, offerprice=? where fooditemid=? ",[req.body.restaurantid, req.body.categoryid, req.body.fooditemname, req.body.foodtype, req.body.ingredients, req.body.price, req.body.offerprice, req.body.fooditemid],function(error,result){
    if (error)
    {
        console.log(error)
        res.status(200).json({status:false,message:'Database Error'})
    }
    else
    {
        res.status(200).json({status:true,message:' Food Item Updated Successfully'})
    }
        })
    
    });


    router.post('/subcategory_edit_icon',upload.any(), function(req, res, next) {
        pool.query("update fooditems set icon=? where fooditemid=?",[ req.files[0].filename,req.body.fooditemid],function(error,result){
        if(error)
        {
            console.log(error)
            res.status(200).json({status:false,message:'Database Error'})
        
        }
        else
        {
            res.status(200).json({status:true,message:'Icon  Updated Successfully'})
        }
        })
        });


        router.post('/subcategory_delete',upload.any(), function(req, res, next) {
            pool.query("delete from fooditems  where fooditemid=?",[ req.body.fooditemid ],function(error,result){
            if(error)
            {
                console.log(error)
                res.status(200).json({status:false,message:'Database Error'})
            
            }
            else
            {
                res.status(200).json({status:true,message:'Sub Category Deleted Successfully'})
            }
            
            })
            
             
            });


            router.post('/fetch_all_fooditem_categorywise',function(req,res){
                pool.query('select F.*, (select C.categoryname from category C where C.categoryid=F.categoryid) as categoryname from fooditems F where F.restaurantid=? and F.categoryid=?',[req.body.restaurantid, req.body.categoryid],function(error,result){
                    if(error)
                    {
                        console.log(error)
                        res.status(200).json({status:false,message:'Database Error',data:[]})
                    
                    }
                    else
                    {  console.log(result)
                        res.status(200).json({status:true,data:result,message:'Food Item Added Successfully'})
                    }
                }) 
                })

module.exports=router
