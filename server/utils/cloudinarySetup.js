import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: "server/config/config.env" });

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary.v2;
