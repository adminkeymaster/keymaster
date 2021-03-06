import mongoose from "mongoose";

const users = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 50,
  },
  photoLink: {
    type: String,
  },
  photoID: {
    type: String,
  },
  birthDate: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    maxlength: 15,
  },
  password: {
    required: true,
    type: String,
  },
  record: [
    {
      keymasterType: { type: String },
      time: { type: Number },
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
  lastComp: [
    {
      type: { type: String },
      ageGroup: { type: String },
      record: [
        {
          keymasterType: { type: String },
          time: { type: Number },
        },
      ],
      compName: {
        type: String,
      },
    },
  ],
});

export default mongoose.models?.users || mongoose.model("users", users);
