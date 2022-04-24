import mongoose from "mongoose";

const prodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Product Name"],
    maxlength: [80, "Name cannot exceed 80 characters"],
    minlength: [2, "Name should have 2 or more than 2 characters"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter Product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter Product Price"],
    maxLength: [8, "Price cannot exceed 8 figure"],
  },
  quantity: {
    type: Number,
    required: [true, "Please Enter Product Quantity"],
    default: 1,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Product", prodSchema);
