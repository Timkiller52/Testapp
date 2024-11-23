const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, default: "" }, // Optional car image URL
});

module.exports = mongoose.model("Car", CarSchema);
