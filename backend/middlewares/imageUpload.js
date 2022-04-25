import ErrorHandler from "../utils/errorHandler.js";
import uploader from "../utils/imageUploader.js";
import Product from "../models/productModel.js";

export function prodImageUpload(req, res, next) {
  const upload = uploader(
    "products",
    ["image/jpeg", "image/jpg", "image/png"],
    5000000,
    "Only .jpg, .jpeg or .png format allowed for product image"
  );

  upload.array("prodImages", 5)(req, res, (err) => {
    if (err) {
      next(new ErrorHandler(err.message, 500));
    } else {
      next();
    }
  });
}

export async function singleImageUpload(req, res, next) {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  if (product.images.length < 5) {
    const upload = uploader(
      "products",
      ["image/jpeg", "image/jpg", "image/png"],
      5000000,
      "Only .jpg, .jpeg or .png format allowed"
    );

    upload.any()(req, res, (err) => {
      if (err) {
        next(new ErrorHandler(err.message, 500));
      } else {
        next();
      }
    });
  } else {
    next(new ErrorHandler("The product cannot have more than 5 images", 400));
  }
}

export function avatarUpload(req, res, next) {
  const upload = uploader(
    "avatars",
    ["image/jpeg", "image/jpg", "image/png"],
    4000000,
    "Only .jpg, .jpeg or .png format allowed"
  );

  upload.any()(req, res, (err) => {
    if (err) {
      next(new ErrorHandler(err.message, 500));
    } else {
      next();
    }
  });
}
