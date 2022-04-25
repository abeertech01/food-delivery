import { unlink } from "fs";
import path from "path";

import checkAsyncError from "./checkAsyncError.js";
import Product from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";

const __dirname = path.resolve();

const checkProduct = checkAsyncError(async (req, res, next) => {
  const product = await Product.findOne({ name: req.body.name });

  if (!product) {
    next();
  } else {
    const prodImages = [];
    for (const img in req.files) {
      prodImages.push(req.files[img].filename);
    }

    for (let i = 0; i < prodImages.length; i++) {
      unlink(
        path.join(__dirname, `/public/uploads/products/${prodImages[i]}`),
        (err) => {
          if (err) next(new ErrorHandler(err.message, 400));
        }
      );
    }

    next();
  }
});

export default checkProduct;
