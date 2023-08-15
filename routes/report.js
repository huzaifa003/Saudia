var express = require("express");
var mongoose = require("mongoose");

const Report = require("../models/reportModel");

var router = express.Router();
const generateRandomNumber = () => {
  return Math.floor(Math.random() * 100000000) + 1;
};

router.get("/", async (req, res) => {
  res.render("InsertReport");
});
router.post("/insert", async (req, res) => {
  try {
    const data = req.body;
    let unique = false;
    let randomNo;

    while (!unique) {
      randomNo = generateRandomNumber();
      const existingReport = await Report.findOne({
        serial_no: randomNo,
      }).exec();

      if (!existingReport) {
        unique = true;
      }
    }
    const repData = await Report.insertMany({
      doc_details: data,
      doc_id: String(randomNo),
    });
    // res.json({ success: true, message: 'Data saved successfully' });
    res.send(no);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

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

router.post("/edit/:doc_id", async (req, res) => {
  let doc_id = req.params.doc_id;
  console.log(doc_id);
  let record = await Report.findOne({ doc_id: doc_id });

  if (record) {
    res.status(200).render("EditReport", { record: record });
    return;
  }

  res.status(404).json({ error: "Not found" });
});
router.post("/update/:doc_id", async (req, res) => {
    try {
      const doc_id = req.params.doc_id;
      const body = req.body;

      const requestBody = body
      
      
      
      const existingRecord = await Report.findOne({ doc_id: doc_id });
      if (existingRecord) {
       
        const convertedData = {
            "doc_id": doc_id,
            "doc_details": []
          };
          for (let i = 0; i < requestBody.welder_id.length; i++) {
            const docDetail = {
              "welder_id": requestBody.welder_id[i],
              "iqama_no": requestBody.iqama_no[i],
              "test_coupon_id": requestBody.test_coupon_id[i],
              "date_of_inspection": requestBody.date_of_inspection[i],
              "welding_process": requestBody.welding_process[i],
              "type_of_welding": requestBody.type_of_welding[i],
              "backing": requestBody.backing[i],
              "typeof_weld": requestBody.typeof_weld[i],
              "thickness": requestBody.thickness[i],
              "product_type": requestBody.product_type[i],
              "diameter_of_pipe": requestBody.diameter_of_pipe[i],
              "base_metal_p_no": requestBody.base_metal_p_number[i],
              "sfa": requestBody.sfa[i],
              "s": requestBody.s[i],
              "gtaw_paw": requestBody.gtaw_paw[i],
              "deposit_thickness": requestBody.deposit_thickness[i],
              "welding_position": requestBody.welding_position[i],
              "vertical_progression": requestBody.vertical_progression[i],
              "ofw": requestBody.ofw[i],
              "inert_gas": requestBody.inert_gas[i],
              "transfer_mode": requestBody.transfer_mode[i],
              "type_polarity": requestBody.type_polarity[i],
              "voltage": requestBody.voltage[i],
              "current": requestBody.current[i],
              "travel_speed": requestBody.travel_speed[i],
              "interpass_temperature": requestBody.interpass_temperature[i],
              "pre_heat": requestBody.pre_heat[i],
              "post_weld": requestBody.post_weld[i]
            };
            convertedData.doc_details.push(docDetail);
        }
       existingRecord.doc_details = convertedData.doc_details;
        await existingRecord.save();
        // res.status(200).json(existingRecord);
        if (req.session.user==='inspector') {
          res.redirect('/inspector')
        }else{
          res.redirect('/supervisor')
        }
       
      } else {
        // Create a new report if the record doesn't exist
       
        res.status(200).json('recprd not found');
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

router.post("/view/:doc_id", async (req, res) => {
  let doc_id = req.params.doc_id;
  console.log(doc_id);
  const record = await Report.findOne({ doc_id: doc_id });
  console.log(record);
  if (record) {
    res.status(200).render("ViewReport", { record: record, doc_id: doc_id , 'session':req.session.user});
    return;
  }
  res.status(404).json({ error: "Not found" });
});

module.exports = router;
