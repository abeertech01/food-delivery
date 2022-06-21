import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import connectDB from "./config/database.js";
import routes from "./routes/index.js";
import errorMiddleware from "./middlewares/error.js";

const app = express();
const __dirname = path.resolve();

//Config
// if (process.env.NODE_ENV !== "production") {
dotenv.config({ path: "server/config/config.env" });
// }

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use(express.static(path.join(__dirname, "../client/build")));

// Connect Database
connectDB();

// Routes
routes(app);

// Middleware for errors
app.use(errorMiddleware);

// if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join("client/build")));
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
);
// }

app.listen(process.env.PORT, () =>
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
);
