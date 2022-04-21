// internal
import checkAsyncError from "../middlewares/checkAsyncError.js";
import Product from "../models/productModel.js";

// Get Products
export const getProducts = checkAsyncError(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// Get Product Details
export const productDetails = checkAsyncError(async (req, res, next) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  res.status(200).json({
    success: true,
    product,
  });
});

// Create A Product
export const newProduct = checkAsyncError(async (req, res, next) => {
  const product = new Product({
    ...req.body,
  });

  await product.save();

  res.status(201).json({
    success: true,
    product,
  });
});
