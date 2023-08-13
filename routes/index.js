var express = require('express');
const user = require('../models/userModel')
const Report = require ('../models/reportModel')
var router = express.Router();


const getAllReports= async()=>{
 return await Report.find().exec()
}

router.get('/',function(req, res, next) {
  res.render("authentication")
});
router.get('/supervisor',(req,res)=>{

  res.render('Supervisor')
})

router.post('/auth',  function(req, res) {
  console.log(req.body.id);
  if (req.body.user_role === 'supervisor') {
     const User = user.findOne({ 'userId':req.body.id, 'password': req.body.password });
     console.log(User);
     if(User){
      console.log('User Found ');
      res.redirect('/supervisor')
     }else{
      console.log('Not Found ');
     }
  }
  if (req.body.user_role === 'inspector') {
    const User = user.findOne({ 'userId':req.body.id, 'password': req.body.password });
    console.log(User);
    if(User){
     console.log('User Found ');
     res.render('inspector', {'records':[getAllReports()]})
    }else{
     console.log('Not Found ');
    }
 }
});

module.exports = router;
  