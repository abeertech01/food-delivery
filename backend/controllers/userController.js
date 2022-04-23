import checkAsyncError from "../middlewares/checkAsyncError.js";
import User from "../models/userModel.js";
import sendToken from "../utils/jwtToken.js";

// Register a user
export const registerUser = checkAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User({
    name,
    email,
    password,
    avatar: req.files[0].filename,
  });

  await user.save();

  sendToken(user, 201, res);
});
