const mongoose = require("mongoose");

const recordRequest = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  videoLink: {
    type: String,
    required: true
  },
  videoID: {
    type: String,
    required: true

  },
  keymasterType: {
    type: String,
    required: true

  },
  time: {
    type: Number,
    required: true
  },
});

module.exports =
  mongoose.models.recordRequest ||
  mongoose.model("recordRequest", recordRequest);
