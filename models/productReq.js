import mongoose from "mongoose";

const productReq = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  productInfo: [
    {
      productID: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
    },
  ],
  status: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.models?.productReq ||
  mongoose.model("productReq", productReq);
