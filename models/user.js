const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  // Password and username are automatically defined by mongoose passport local
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
