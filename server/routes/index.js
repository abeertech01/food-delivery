import productRoute from "./productRoute.js";

export default (app) => {
  app.use("/api/v1", productRoute);
};
