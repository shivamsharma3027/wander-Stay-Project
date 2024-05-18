const express=require("express")
const router=express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const {reviewSchema} = require("../Schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing");
const Review =require("../models/review.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController=require("../controllers/reviews.js")



//Reviews

//Post review Route

router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview))


//Delete review route

router.delete("/:reviewId",isReviewAuthor,isLoggedIn,wrapAsync(reviewController.destroyReview))

module.exports=router;