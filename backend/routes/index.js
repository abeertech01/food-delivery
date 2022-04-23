import productRouter from "./productRouter.js";
import userRouter from "./userRouter.js";

export default (app) => {
  app.use("/api", productRouter);
  app.use("/api", userRouter);
};
