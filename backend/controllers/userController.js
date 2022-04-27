import checkAsyncError from "../middlewares/checkAsyncError.js";
import User from "../models/userModel.js";
import deleteImage from "../utils/deleteImage.js";
import ErrorHandler from "../utils/errorHandler.js";
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

// Login
export const loginUser = checkAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  // Checking if user has given password and email both
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// Logout
export const logoutUser = checkAsyncError(async (req, res, next) => {
  res.cookie("jwtToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Get User Details
export const getUserDetails = checkAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Profile
export const updateProfile = checkAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    avatar: req.files[0].filename,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User password
export const updatePassword = checkAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// Get all users - Admin
export const getAllUsers = checkAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get Single user - Admin
export const getSingleUser = checkAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Role - Admin
export const updateUserRole = checkAsyncError(async (req, res, next) => {
  await User.findByIdAndUpdate(
    req.params.id,
    { role: req.body.role },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

// Delete User
export const deleteUser2 = checkAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  console.log(user);

  if (!user) {
    return next(
      new ErrorHandler(
        `User does not exist with this id: ${req.params.id}`,
        404
      )
    );
  }

  const avatar = await user.avatar;
  deleteUser("avatars", avatar);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});

export const deleteUser = checkAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    next(
      new ErrorHandler(
        `User does not exist with this id: ${req.params.id}`,
        404
      )
    );
  }

  const avatar = user.avatar;
  deleteImage("avatars", avatar);

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
