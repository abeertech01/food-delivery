import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./products";
import commonReducer from "./common";

export default configureStore({
  reducer: {
    products: productReducer,
    common: commonReducer,
  },
});
