import express from "express";

import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
  updatePassword,
  updateProfile,
  updateUserRole,
} from "../controllers/userController.js";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.js";
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
router
  .route("/users")
  .get(isAuthenticated, authorizeRoles("admin"), getAllUsers);
router
  .route("/users/:id")
  .get(isAuthenticated, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticated, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteUser);

export default router;
