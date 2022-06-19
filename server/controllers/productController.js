import fs from "fs";

import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ProductModel from "../models/ProductModel.js";
import ApiFeatures from "../utils/apiFeatures.js";
import cloudinarySetup from "../utils/cloudinarySetup.js";
import ErrorHandler from "../utils/errorHandler.js";

// Get all products and product related numbers
export const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const allProducts = await ProductModel.find();

  const resultPerPage = 8;
  const productsCount = await ProductModel.countDocuments();

  const apiFeature = new ApiFeatures(ProductModel.find(), req.query)
    .search()
    .filterCategory()
    .pagination(resultPerPage);

  // these products come after pagination. That's why 'products' has maximum 8 products
  const products = await apiFeature.query;

  res.status(200).json({
    success: true,
    allProducts,
    products,
    productsCount,
    resultPerPage,
  });
});

// Create a new product
export const newProduct = catchAsyncErrors(async (req, res, next) => {
  const record = await ProductModel.findOne({ name: req.body.name });

  if (record) {
    next(new ErrorHandler("This product is already in menu", 400));
  }

  const images = [];
  const files = req.files;

  for (const file of files) {
    const { path } = file;
    const result = await cloudinarySetup.uploader.upload(path, {
      folder: "products",
    });
    images.push({
      id: result.public_id,
      url: result.secure_url,
    });
    fs.unlinkSync(path);
  }

  const product = new ProductModel({
    ...req.body,
    images,
  });
  const savedProduct = await product.save();

  res.status(200).json({
    success: true,
    product: savedProduct,
  });
});
