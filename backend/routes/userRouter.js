import express from "express";

import { registerUser } from "../controllers/userController.js";
import avatarUpload from "../middlewares/avatarUpload.js";

const router = express.Router();

router.route("/register").post(avatarUpload, registerUser);

export default router;
