import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import routes from "./routes/index.js";
import connectDB from "./utils/connectDB.js";
import errorMiddleware from "./middlewares/error.js";

const app = express();
const __dirname = path.resolve();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Connecting to database
connectDB();

routes(app);

// Error middleware
app.use(errorMiddleware);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
);
