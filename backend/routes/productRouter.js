import express from "express";
import multer from "multer";

import {
  addProductImage,
  deleteProduct,
  deleteProductImage,
  getProducts,
  newProduct,
  productDetails,
  updateProduct,
} from "../controllers/productController.js";
import {
  prodImageUpload,
  singleImageUpload,
} from "../middlewares/imageUpload.js";

const router = express.Router();

router.route("/products").get(getProducts);
router.route("/new-product").post(prodImageUpload, newProduct);
router
  .route("/products/:id")
  .get(productDetails)
  .put(updateProduct)
  .delete(deleteProduct);
router.route("/delete-product-image/:id").put(deleteProductImage);
router.route("/add-product-image/:id").post(singleImageUpload, addProductImage);

export default router;
