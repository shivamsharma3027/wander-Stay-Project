const mongoose=require("mongoose")
const initdata=require("./data")
const Listing=require("../models/listing")

const MONGO_URL="mongodb://127.0.0.1:27017/wanderstay";

main().then(()=>{
  console.log("connected to db");
})
.catch((err)=>{
  console.log(err);
})

async function main(){
await mongoose.connect(MONGO_URL);
}

const initDb=async ()=>{
  try {
    await Listing.deleteMany({});
    const updatedData = initdata.data.map((obj) => ({ ...obj, owner: '6644f0da2376c85d66de426a' }));
    await Listing.insertMany(updatedData);
    console.log('Data was initialized successfully');
  } catch (error) {
    console.error('Error initializing data:', error);
  }
}
initDb();