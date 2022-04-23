import checkAsyncError from "../middlewares/checkAsyncError.js";
import User from "../models/userModel.js";
import sendToken from "../utils/jwtToken.js";

// Register a user
export const registerUser = checkAsyncError(async (req, res, next) => {
  let user;
  const { name, email, password } = req.body;

  if (req.files && req.files.length > 0) {
    user = await User({
      name,
      email,
      password,
      avatar: req.files[0].filename,
    });
  } else {
    user = await User({
      name,
      email,
      password,
    });
  }

  await user.save();

  sendToken(user, 201, res);
});
