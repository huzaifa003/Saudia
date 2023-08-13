var express = require('express');
var mongoose = require('mongoose');

const Report = require('../models/reportModel');

var router = express.Router();

router.get("/",async (req,res)=>{
    const last_one = await Report.findOne().sort({_id : -1}).exec();
    let no = 1;
    if (last_one){
        console.log(last_one)
        no = last_one.serial_no + 1;
    }
    res.render('InsertReport', {id: no})
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
    // body['welder_id'] = "w-" + String(no);
    body['doc_id'] = "r-" + String(no);
        try {
        const report = await Report.create(req.body);
        res.status(200).render(report);
    } catch (error) {
        console.log(error);
        res.status(500).json({"message" : error.message});
    }
})

router.post('/addRows/:id',async(req,res)=>{
    const body = req.body;
    // body['serial_no'] = Report.find().count()+1;
    // body['welder_id'] = 
    // const last_one = await Report.findOne().sort({_id : -1}).exec();
    // let no = 1;
    // if (last_one){
    //     console.log(last_one)
    //     no = last_one.serial_no + 1;
    // }

    // console.log(no);

    no = req.params.id
    body['serial_no'] = no;
    // body['welder_id'] = "w-" + String(no);
    body['doc_id'] = "r-" + String(no);
        try {
        const report = await Report.create(req.body);
        
        let record = await Report.find({ doc_id: { $all: body.doc_id } })
        if (!Array.isArray(record)){
            record = [record];
        }
        console.log(record);
        if (record){
            res.status(200).render("InsertAndViewReport",{"id" : no, record: record});
            return;
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({"message" : error.message});
    }
})

router.get("/edit/:doc_id", async(req,res)=>{
    let doc_id = req.params.doc_id;
    let record = await Report.findOne({"doc_id": doc_id});
    
    if (record){
        res.status(200).render("EditReport",{record:record});
        return;
    }

    res.status(404).json({"error": "Not found"});

})
router.post("/update", async(req,res)=>{
    let body = req.body;
    let record = await Report.findOne({"doc_id": body.doc_id});
    console.log(body);
    if (record){
        // record = body;
        // console.log(record);
        // const newRecord = new Report(record)
        // await newRecord.save()
        
        const de = await Report.findByIdAndDelete(record._id);
        console.log(de);
        // body._id = record._id;

        // const newRecord = await new Report(body);
        // newRecord.save();
        // res.status(200).json({"status": "Updated Successfully", "updated": record});

        const report = await Report.create(req.body);
        res.status(200).json({"status": "Updated Successfully", "updated": report});
    }

    else{
        const report = await Report.create(req.body);
        res.status(200).json(report);
    }
})


router.get("/get/:doc_id",async(req,res)=>{
    let doc_id = req.params.doc_id;
    console.log(doc_id);
 
    const record = await Report.find({ doc_id: { $all: doc_id } })
    console.log(record);
    if (record){
        res.status(200).render("ViewReport",{record:record});
        return;
    }

    res.status(404).json({"error": "Not found"});
    
})

module.exports = router;