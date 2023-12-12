var express = require('express');
var router = express.Router();
var pool=require("./pool")
var jwt=require('jsonwebtoken')


/* GET home page. */
/*
router.post('/chktoken', function(req, res, next) {
  const token = req.headers.authorization
jwt.verify(token,'shhhhh',function(err, decoded) {

res.status(200).json(decoded)
})

})
*/

router.post('/checklogin', function(req, res, next) {
  console.log(req.body)
  pool.query('select *from superadmin where emailid=? and password=?',[req.body.emailid, req.body.password],function(error,result){
    if(error)
{
res.status(200).json({status:false,data:[],message:'Server Error....'})
}
else
{
    if(result.length==1)
    //,{expiresIn:"60s"}
    {
      var token=jwt.sign({data:result[0]},'shhhhh...')
     console.log(token)

 res.status(200).json({status:true,data:result[0],message:'Login Successful'})
}
else
{
    res.status(200).json({status:false,data:[],message:'Invalid UserId/Password '})
}

}

  })
});

module.exports = router;
