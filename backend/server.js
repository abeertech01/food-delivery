import express from "express";
import dotenv from "dotenv";

import routes from "./routes/index.js";
import connectDB from "./utils/connectDB.js";
import errorMiddleware from "./middlewares/error.js";

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Connecting to database
connectDB();

routes(app);

// app.use((err, req, res, next) => {
//   res.json({
//     msg: err.message,
//     statusCode: "eta nai",
//     error: err,
//   });
// });
app.use(errorMiddleware);

app.listen(process.env.PORT, () =>
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
);
