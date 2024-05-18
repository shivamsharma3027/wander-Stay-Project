const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Review = require("./review");
const user = require("./user");
const listingSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  image: {
    url:String,
    filename:String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  owner:{
     type:Schema.Types.ObjectId,
     ref:"User",
  },
  category:{
    type:String,
    default: "trending" ,
    enums:["trending","rooms","iconic-cities","mountains","pools","campings","farms"]
  }
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
