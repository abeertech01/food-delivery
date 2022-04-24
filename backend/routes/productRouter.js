import express from "express";
import multer from "multer";

import {
  deleteProduct,
  getProducts,
  newProduct,
  productDetails,
  updateProduct,
} from "../controllers/productController.js";
import { prodImageUpload } from "../middlewares/imageUpload.js";

const router = express.Router();

router.route("/products").get(getProducts);
router.route("/new-product").post(prodImageUpload, newProduct);
router
  .route("/products/:id")
  .get(productDetails)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;
