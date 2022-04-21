import express from "express";

import {
  getProducts,
  newProduct,
  productDetails,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/products").get(getProducts);
router.route("/new-product").post(newProduct);
router.route("/products/:id").get(productDetails);

export default router;
