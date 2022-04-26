import express from "express";

import {
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
  updatePassword,
  updateProfile,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import checkAvatar from "../middlewares/checkAvatar.js";
import { avatarUpload } from "../middlewares/imageUpload.js";

const router = express.Router();

router.route("/register").post(avatarUpload, registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthenticated, getUserDetails);
router
  .route("/update-profile")
  .put(isAuthenticated, avatarUpload, checkAvatar, updateProfile);
router.route("/update-password").put(isAuthenticated, updatePassword);

export default router;
