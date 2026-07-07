const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: String,
  category: String,
  location: String,
  status: String,
  image: String,
});

module.exports = mongoose.model("Item", itemSchema);