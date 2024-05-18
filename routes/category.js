
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../Schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing");

const multer  = require('multer')
const {storage}=require("../cloudConfig.js")
const upload = multer({ storage})

router.get('/:type', async (req, res) => {
  
    const {type} = req.params;
  
    const listings = await Listing.find({ category:type });
  
    res.render('listings/category', { listings, type });
  
    
   
  
});

module.exports=router;