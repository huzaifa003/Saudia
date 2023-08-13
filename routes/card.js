var express = require('express');
var mongoose = require('mongoose');
var qrcode = require('qrcode');
const fs = require('fs');
const Card = require('../models/cardModel');
const path = require('path');
var router = express.Router();

router.get("/", async (req, res) => {
    res.render("insertCard");
})
router.post("/insert", async (req, res) => {
    let body = req.body;
    const last_one = await Card.findOne().sort({ _id: -1 }).exec();
    let no = 1;
    if (last_one) {
        console.log(last_one)
        no = last_one.count + 1;
    }
    body['count'] = no;
    body['welder_id'] = "w-" + no;
    body['card_no'] = "c-" + no;

    // console.log(req.files)
    const file = req.files.card;
    console.log(file);

    let folder_name = "./uploads/" + body['card_no'];
    console.log(folder_name)
    fs.mkdir(folder_name, (err) => {
        if (err) {
            console.error('Error creating directory:', err);
        } else {
            console.log('Directory created successfully');
        }
    });

    let fname = body['card_no'] + ".jpg"
    file.mv("./uploads/" + "/" +body['card_no'] + "/" + fname, (err) => {
        if (err) {
            console.error('Error moving File:', err);
        } else {
            console.log('File moving successfully');
        }
    })
    qrcode.toFile("./uploads/" + body['card_no'] + "/" +body['card_no'] + ".png", "localhost:4200/" + body['card_no']);
    body['qr'] = body['card_no'] + ".png"
    body['image'] = body['card_no'] + ".jpg"
    const card = await Card.create(body);

    res.send(card);
    

})

module.exports = router;