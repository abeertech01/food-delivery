// internal
import checkAsyncError from "../middlewares/checkAsyncError.js";
import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";

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
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

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

// Update A Product
export const updateProduct = checkAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// Delete A Product
export const deleteProduct = checkAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});
