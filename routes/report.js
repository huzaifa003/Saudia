var express = require('express');
var mongoose = require('mongoose');

const Report = require('../models/reportModel');

var router = express.Router();

router.get("/",(req,res)=>{
    res.send("Hello Report");
})

router.post("/insert",async(req,res)=>{
    const body = req.body;
    // body['serial_no'] = Report.find().count()+1;
    // body['welder_id'] = 
    const last_one = await Report.findOne().sort({_id : -1}).exec();
    let no = 1;
    if (last_one){
        console.log(last_one)
        no = last_one.serial_no + 1;
    }

    console.log(no);
    body['serial_no'] = no;
    body['welder_id'] = "w-" + String(no);
    body['doc_id'] = "r-" + String(no);
        try {
        const report = await Report.create(req.body);
        res.status(200).json(report);
    } catch (error) {
        console.log(error);
        res.status(500).json({"message" : error.message});
    }
})


router.get("/get/:doc_id",async(req,res)=>{
    let doc_id = req.params.doc_id;

    const record = await Report.findOne({"doc_id": doc_id});
    console.log(record);
    if (record){
        res.status(200).render("report",{record});
        return;
    }

    res.status(404).json({"error": "Not found"});
    
})
module.exports = router;