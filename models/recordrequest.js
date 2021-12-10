const mongoose = require("mongoose");

const recordRequest = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  videoLink: {
    type: String,
  },
  keymasterType: {
    type: String,
  },
  time: {
    type: Number,
  },
});

module.exports =
  mongoose.models.recordRequest ||
  mongoose.model("recordRequest", recordRequest);
