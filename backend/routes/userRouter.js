import express from "express";

import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";
import { avatarUpload } from "../middlewares/imageUpload.js";

const router = express.Router();

router.route("/register").post(avatarUpload, registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

export default router;
