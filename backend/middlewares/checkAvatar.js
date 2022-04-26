import checkAsyncError from "./checkAsyncError.js";
import User from "../models/userModel.js";
import deleteImage from "../utils/deleteImage.js";

const checkAvatar = checkAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  const avatar = await user.avatar;

  deleteImage("avatars", avatar);

  next();
});

export default checkAvatar;
