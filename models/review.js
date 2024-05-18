const mongoose=require("mongoose")

const Schema = mongoose.Schema;

const reviewSchema=new Schema({
  comment:String,
  rating:{
    type:Number,
    default:Date.now()
  },
  author:{
    type:Schema.Types.ObjectId,
    ref:"User",
 },
})

module.exports=mongoose.model("Review",reviewSchema)

//one to mamy relationship with listing model