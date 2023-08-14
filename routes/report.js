var express = require('express');
var mongoose = require('mongoose');

const Report = require('../models/reportModel');

var router = express.Router();
const generateRandomNumber = () => {
    return Math.floor(Math.random() * 100000000) + 1;
};

router.get("/", async (req, res) => {
    

        res.render('InsertReport');
     
});
router.post("/insert",async(req,res)=>{
    try {
        const data = req.body;
        let unique = false;
        let randomNo;

        while (!unique) {
            randomNo = generateRandomNumber();
            const existingReport = await Report.findOne({ serial_no: randomNo }).exec();
            
            if (!existingReport) {
                unique = true;
            }
        }
       const repData= await Report.insertMany({'doc_details':data , 'doc_id':String(randomNo) })        
       // res.json({ success: true, message: 'Data saved successfully' });
        res.send(no)
        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
})


// router.post('/addRows/:id',async(req,res)=>{
//     const body = req.body;


//     no = req.params.id
//     body['serial_no'] = no;
//     // body['welder_id'] = "w-" + String(no);
//     body['doc_id'] = "r-" + String(no);
//         try {
//         const report = await Report.create(req.body);
        
//         let record = await Report.find({ doc_id: { $all: body.doc_id } })
//         if (!Array.isArray(record)){
//             record = [record];
//         }
//         console.log(record);
//         if (record){
//             res.status(200).render("InsertAndViewReport",{"id" : no});
//             return;
//         }
        
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({"message" : error.message});
//     }
    
// })

router.post("/edit/:doc_id", async(req,res)=>{
    let doc_id = req.params.doc_id;
    console.log(doc_id);
    let record = await Report.findOne({"doc_id": doc_id});
    
    if (record){
        res.status(200).render("EditReport",{record:record});
        return;
    }

    res.status(404).json({"error": "Not found"});

})
router.post("/update/:doc_id", async (req, res) => {
    try {
        let doc_id= req.params.doc_id
        const body = req.body;
        const existingRecord = await Report.findOne({ "doc_id": doc_id });

        if (existingRecord) {
            // Update the existing record's doc_details
            existingRecord.doc_details = body.doc_details;
            await existingRecord.save();
            res.status(200).json(existingRecord);
        } else {
            // Create a new report if the record doesn't exist
            const newReport = await Report.create(req.body);
            res.status(200).json(newReport);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post("/view/:doc_id",async(req,res)=>{
    let doc_id = req.params.doc_id;
    console.log(doc_id);
    const record = await Report.findOne({ "doc_id": doc_id });
    console.log(record);
    if (record){
        res.status(200).render("ViewReport",{record:record,'doc_id':doc_id});
        return;
    }
    res.status(404).json({"error": "Not found"});
    
})

module.exports = router;