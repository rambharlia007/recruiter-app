const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  socialId: String,
  imageUrl: String,
  emailId: String,
  role: String,
  phoneNumber: String
});

const User = mongoose.model("user", userSchema);

module.exports = User;
