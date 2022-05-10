import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import routes from "./routes/index.js";
import connectDB from "./utils/connectDB.js";
import errorMiddleware from "./middlewares/error.js";

const app = express();
const __dirname = path.resolve();

dotenv.config({ path: "backend/config.env" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/content", express.static(path.join(__dirname, "/public")));
app.use(cors());

//Connecting to database
connectDB();

routes(app);

// Error middleware
app.use(errorMiddleware);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
);
