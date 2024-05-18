const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../Schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController=require("../controllers/listing.js")
const multer  = require('multer')
const {storage}=require("../cloudConfig.js")
const upload = multer({ storage})


//index route
router.get("/",wrapAsync(listingController.index));

//new route
router.get("/new", isLoggedIn,listingController.renderNewForm );


router.post(
  "/new",isLoggedIn, upload.single('listing[image]'), wrapAsync(listingController.createListing)),



//show route
router.get("/:id",wrapAsync(listingController.showListing ));

//edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

//update route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.updateListings)
);

//Delete route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListings)
);

module.exports = router;
