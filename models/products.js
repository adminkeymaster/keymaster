const mongoose = require('mongoose');

const product = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  hexColor: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  photoLink: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.models.product || mongoose.model('product', product);
