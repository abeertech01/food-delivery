import ErrorHandler from "../utils/errorHandler.js";
import uploader from "../utils/imageUploader.js";

function avatarUpload(req, res, next) {
  const upload = uploader(
    "avatars",
    ["image/jpeg", "image/jpg", "image/png"],
    4000000,
    "Only .jpg, .jpeg or .png format allowed"
  );

  upload.any()(req, res, (err) => {
    if (err) {
      next(new ErrorHandler(err.message, 500));
    } else {
      next();
    }
  });
}

export default avatarUpload;
