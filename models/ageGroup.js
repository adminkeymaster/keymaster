import mongoose from "mongoose";

const ageGroup = new mongoose.Schema({
  age: [
    {
      type: Number,
      required: true,
    },
  ],
});

export default mongoose.models?.ageGroup ||
  mongoose.model("ageGroup", ageGroup);
