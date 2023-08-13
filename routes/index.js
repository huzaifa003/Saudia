var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("insertCertificate")
});
// router.post('/auth',(req,res)=>{
//   const { id,password,user_role }=req.body
//   console.log(user_role);
// })
module.exports = router;
  