import mongoose from "mongoose";

const news = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  photoLink: { type: String, required: true },
  photoID: { type: String, required: true },
  date: { type: String },
});

export default mongoose.models?.news || mongoose.model("news", news);
