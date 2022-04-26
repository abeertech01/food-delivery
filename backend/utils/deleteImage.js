import fs, { unlink } from "fs";
import path from "path";

const __dirname = path.resolve();

export default function deleteImage(subfolder, filename) {
  const dir = path.join(__dirname, `/public/uploads/${subfolder}`);
  const files = fs.readdirSync(dir);
  const doesExists = files.some((el) => el === filename);

  if (doesExists) {
    unlink(
      path.join(__dirname, `/public/uploads/${subfolder}/${filename}`),
      (err) => {
        if (err) next(new ErrorHandler(err.message, 400));
      }
    );
  }
}
