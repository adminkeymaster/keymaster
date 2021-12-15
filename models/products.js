const mongoose = require("mongoose");

const product = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  hexColor: {
    type: [String],
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  photoLinks: [{
    type: String,
    required: true,
  }],
  photoIDs: [{
    type: String,
    required: true
  }],
  productPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.models.product || mongoose.model("product", product);
