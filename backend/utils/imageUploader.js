import multer from "multer";
import path from "path";

import ErrorHandler from "./errorHandler.js";

const __dirname = path.resolve();

function uploader(
  subfolder_path,
  allowed_file_types,
  max_file_size,
  error_msg
) {
  // File upload folder
  const UPLOADS_FOLDER = `${__dirname}/public/uploads/${subfolder_path}`;

  // define the storage
  const storage = multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();

      cb(null, fileName + fileExt);
    },
  });

  // prepare the final multer upload object
  const upload = multer({
    storage,
    limits: {
      fileSize: max_file_size,
    },
    fileFilter: (req, file, cb) => {
      if (allowed_file_types.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new ErrorHandler(error_msg, 422));
      }
    },
  });

  return upload;
}

export default uploader;
