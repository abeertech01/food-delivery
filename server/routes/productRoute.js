import express from "express";
import upload from "../utils/multerSetup.js";

import {
  getAllProducts,
  newProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/new-product").post(upload.array("images"), newProduct);

export default router;
