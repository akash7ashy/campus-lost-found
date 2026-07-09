const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: String,
  category: String,
  location: String,
  status: String,
  image: String,
  email: String,
  mobile: String,

  userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
},
});

module.exports = mongoose.model("Item", itemSchema);