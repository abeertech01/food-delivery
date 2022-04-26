// internal
import checkAsyncError from "../middlewares/checkAsyncError.js";
import Product from "../models/productModel.js";
import deleteImage from "../utils/deleteImage.js";
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

// Create A New Product
export const newProduct = checkAsyncError(async (req, res, next) => {
  const { name, description, price, quantity } = req.body;

  const record = await Product.findOne({ name });

  if (record) {
    next(new ErrorHandler("This product is already in menu", 400));
  } else {
    const filenames = [];

    for (const file in req.files) {
      filenames.push(req.files[file].filename);
    }

    const product = new Product({
      name,
      description,
      price,
      quantity,
      images: filenames,
    });

    await product.save();

    res.status(201).json({
      success: true,
      product,
    });
  }
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

// Delete Product Image
export const deleteProductImage = checkAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  let prodImages = product.images;

  if (prodImages.length > 1) {
    const { imageName } = req.body;

    deleteImage("products", imageName);

    prodImages = prodImages.filter((prod) => prod !== imageName);

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { images: prodImages },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
      product,
    });
  } else {
    next(new ErrorHandler("This product must have at least 1 image", 400));
  }
});

// Add Product Image
export const addProductImage = checkAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const singleImage = req.files[0].filename;
  const prodImages = product.images;
  prodImages.push(singleImage);

  product = await Product.findByIdAndUpdate(
    req.params.id,
    { images: prodImages },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

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

  const images = product.images;
  for (let i = 0; i < images.length; i++) {
    deleteImage("products", images[i]);
  }

  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

// Helping function
