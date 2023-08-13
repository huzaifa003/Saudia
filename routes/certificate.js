var express = require('express');
var mongoose = require('mongoose');
var qrcode = require('qrcode');
const fs = require('fs');
const Card = require('../models/cardModel');
const path = require('path');
var router = express.Router();

router.get("/", async (req,res)=>{
    res.render("/")
})

router.post("/insert", async (req,res)=>{
    
})
module.exports = router;

