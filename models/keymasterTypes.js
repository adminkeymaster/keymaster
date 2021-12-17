import mongoose from "mongoose";

const keymasterTypes = new mongoose.Schema({
  keymasterType: {
    type: String,
    required: true,
  },
});

export default mongoose.models?.keymasterTypes ||
  mongoose.model("keymasterTypes", keymasterTypes);
