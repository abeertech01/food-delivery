import express from "express";

import {
  deleteProduct,
  getProducts,
  newProduct,
  productDetails,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/products").get(getProducts);
router.route("/new-product").post(newProduct);
router
  .route("/products/:id")
  .get(productDetails)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;
