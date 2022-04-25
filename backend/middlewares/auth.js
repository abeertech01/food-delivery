import jwt from "jsonwebtoken";

import ErrorHandler from "../utils/errorHandler.js";
import checkAsyncError from "./checkAsyncError.js";
import User from "../models/userModel.js";

export const isAuthenticated = checkAsyncError(async (req, res, next) => {
  const { jwtToken } = req.cookies;

  if (!jwtToken) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodedData = jwt.verify(jwtToken, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);
  next();
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};
