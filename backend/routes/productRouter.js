import express from "express";

import {
  addProductImage,
  deleteProduct,
  deleteProductImage,
  getProducts,
  newProduct,
  productDetails,
  updateProduct,
} from "../controllers/productController.js";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.js";
import checkProduct from "../middlewares/checkProduct.js";
import {
  prodImageUpload,
  singleImageUpload,
} from "../middlewares/imageUpload.js";

const router = express.Router();

router.route("/products").get(getProducts);
router
  .route("/new-product")
  .post(
    isAuthenticated,
    authorizeRoles("admin"),
    prodImageUpload,
    checkProduct,
    newProduct
  );
router
  .route("/products/:id")
  .get(productDetails)
  .put(isAuthenticated, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteProduct);
router
  .route("/delete-product-image/:id")
  .put(isAuthenticated, authorizeRoles("admin"), deleteProductImage);
router
  .route("/add-product-image/:id")
  .post(
    isAuthenticated,
    authorizeRoles("admin"),
    singleImageUpload,
    addProductImage
  );

export default router;
