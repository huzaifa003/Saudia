var express = require('express');
var mongoose = require('mongoose');
var qrcode = require('qrcode');
const fs = require('fs');
const Certificate = require('../models/certificateModel');
const path = require('path');
var router = express.Router();

router.get("/", async (req,res)=>{
    res.render("InsertCertificate")
})

router.post("/insert", async (req,res)=>{
    const body = req.body;
    // body['serial_no'] = Report.find().count()+1;
    // body['welder_id'] = 
    const last_one = await Certificate.findOne().sort({_id : -1}).exec();
    
    let no = 1;
    console.log(last_one == NaN);
    if (last_one && last_one != NaN){
        console.log(last_one)
        no = last_one.count + 1;
        console.log("HELOOOOOOOOOOOOOOOOOOOOo")
    }
    console.log(no);
    body['count'] = no;
    body['certificateNo'] = "certificate_" + String(no);
    console.log(body['certificateNo']);
    const folder = fs.mkdir("./uploads/certificates/" + body['certificateNo'], (err)=>{
        console.log(err);
    })

    const iqama = req.files.iqama;
    const profile = req.files.profile;

    
    await iqama.mv("./uploads/certificates/" + body['certificateNo'] + "/iqama.jpg", (err)=>{
        console.log(err);
    })

    await profile.mv("./uploads/certificates/" + body['certificateNo'] + "/profile.jpg", (err)=>{
        console.log(err);
    })

    await qrcode.toFile("./uploads/certificates/" + body['certificateNo'] + "/qrcode.png","http://localhost:4200/certificate/" + body['certificateNo']);

    const cerf = await Certificate.create(req.body);

    res.send(cerf);


})

router.get("/view/:certificateNo", async(req,res)=>{
    const certificateNo = req.params.certificateNo;

    const record = await Certificate.findOne({"certificateNo": certificateNo}).exec();
    
    if (record){
        res.render("viewCertificate",{record});
        console.log(record.certificateNo);
    }
    else{
        res.status(404).send("No Record Found");
    }

})
module.exports = router;

