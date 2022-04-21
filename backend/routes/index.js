import productRouter from "./productRouter.js";

export default (app) => {
  app.use("/api", productRouter);
};
