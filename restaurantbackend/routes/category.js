var express = require('express');
var router = express.Router();
var pool=require("./pool")
var upload=require("./multer")
/* GET home page. */
router.post('/category_submit',upload.any(), function(req, res, next) {
    pool.query("insert into category(restaurantid, categoryname, icon)values(?,?,?)",[req.body.restaurantid, req.body.categoryname, req.files[0].filename],function(error,result){
if (error)
{
    console.log(error)
    res.status(200).json({status:false,message:'Database Error'})
}
else
{
    res.status(200).json({status:true,message:'Category Added Successfully'})
}
    })

});

router.post('/fetch_all_category',function(req,res){
    pool.query('select * from category where restaurantid=?',[req.body.restaurantid],function(error,result){
        if(error)
        {
            console.log(error)
            res.status(200).json({status:false,message:'Database Error',data:[]})
        
        }
        else
        {  console.log(result)
            res.status(200).json({status:true,data:result,message:'Category Added Successfully'})
        }
    
    }) 
})
   
router.post('/category_edit_data',upload.any(), function(req, res, next) {
pool.query("update  category set restaurantid=?, categoryname=? where categoryid=?",[req.body.restaurantid, req.body.categoryname,req.body.categoryid],function(error,result){
if (error)
{
    console.log(error)
    res.status(200).json({status:false,message:'Database Error'})
}
else
{
    res.status(200).json({status:true,message:'Category Updated Successfully'})
}
    })

});


router.post('/category_edit_icon',upload.any(), function(req, res, next) {
    pool.query("update category set icon=? where categoryid=?",[ req.files[0].filename,req.body.categoryid],function(error,result){
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


router.post('/category_delete',upload.any(), function(req, res, next) {
    pool.query("delete from category  where categoryid=?",[ req.body.categoryid ],function(error,result){
    if(error)
    {
        console.log(error)
        res.status(200).json({status:false,message:'Database Error'})
    
    }
    else
    {
        res.status(200).json({status:true,message:'Category Deleted Successfully'})
    }
    
    })
    
     
    });

 

module.exports = router;