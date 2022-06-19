import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/database.js";
import routes from "./routes/index.js";
import errorMiddleware from "./middlewares/error.js";

const app = express();
// const __dirname = path.resolve();

//Config
dotenv.config({ path: "server/config/config.env" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect Database
connectDB();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// Routes
routes(app);

// Middleware for errors
app.use(errorMiddleware);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
);
