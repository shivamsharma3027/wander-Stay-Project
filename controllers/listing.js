const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});

  res.render("listings/index", { allListings });
};
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

module.exports.showListing = 
  async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("owner");

    console.log(listing.owner);
    res.render("listings/show", { listing });
  };

module.exports.createListing = 
  async (req, res) => {
    let url =req.file.path;
    let filename=req.file.path.filename;
     console.log(req.body.listing);
    const newListing = new Listing(req.body.listing);
    newListing.image={url,filename};
 
    newListing.owner = req.user._id;
    await newListing.save();

    res.redirect("/listings");
  };

module.exports.renderEditForm = 
  async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    
    res.render("listings/edit", { listing });
  };

module.exports.updateListings = async (req, res) => {
  let { id } = req.params;

  let newListing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
  console.log(newListing);
 if(typeof req.file!=="undefined"){
  let url =req.file.path;
  let filename=req.file.filename;
  
  newListing.image={url,filename};

// console.log(url);
await newListing.save();
}

//  console.log(newListing.category);
  res.redirect(`/listings/${id}`);
};
module.exports.destroyListings = async (req, res) => {
  let { id } = req.params;
  const data = await Listing.findByIdAndDelete(id);
  console.log(data);
  res.redirect("/listings");
}

