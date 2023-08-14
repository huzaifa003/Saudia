var express = require('express');
const User = require('../models/userModel')
const Report = require('../models/reportModel')
const Card = require('../models/cardModel')
const Certificate = require('../models/certificateModel')
var router = express.Router();


router.get('/', function (req, res, next) {
  res.render("authentication")
});
router.get('/supervisor', async (req, res) => {
  const cardData = await Card.find().exec()
  const reportData = await Report.find().exec()
  const certificateData = await Certificate.find().exec()

  console.log("---------------- card DATA---------------------")
  console.log(cardData);
  console.log("---------------- card DATA END--------------------")

  // console.log("---------------- report DATA---------------------")
  // console.log(reportData);
  // console.log("---------------- report DATA END--------------------")

  // console.log("---------------- certificate DATA---------------------")
  // console.log(certificateData);
  // console.log("---------------- certificate DATA END--------------------")


  res.render('Supervisor',{"cardData" : cardData, "reportData": reportData, "certificateData": certificateData})
})

router.post('/auth', async function (req, res) {
  console.log(req.body.id);
  if (req.body.user_role === 'supervisor') {
    const user =  User.findOne({ 'userId': req.body.id, 'password': req.body.password });
    console.log(user);
    if (user) {
      console.log('User Found ');
      res.redirect('/supervisor')
    } else {
      console.log('Not Found ');
    }
  }
  if (req.body.user_role === 'inspector') {
    const user = User.findOne({ 'userId': req.body.id, 'password': req.body.password });
    console.log(user);
    if (user) {
      console.log('User Found ');
      const reportData = await Report.find().exec()
      res.render('inspector', {"reportData": reportData });
    } else {
      console.log('Not Found ');
    }
  }
});

module.exports = router;
