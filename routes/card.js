var express = require('express');
var mongoose = require('mongoose');
var qrcode = require('qrcode');
const Card = require('../models/cardModel');

var router = express.Router();

router.get("/", async(req,res)=>{
    const data =  qrcode.toFile("qrcode.png","www.google.com",(err)=>{
        console.log(err);
    })
    res.send(data);
})
router.post("/insert",async(req,res)=>{
    let body = req.body;
    const last_one = await Card.findOne().sort({_id : -1}).exec();
    let no = 1;
    if (last_one){
        console.log(last_one)
        no = last_one.count + 1;
    }
    body['count'] = no;
    body['welder_id'] = "w-" + no;
    body['card_no'] = "c-" + no;


    const card = await Card.create(body);

})

module.exports = router;