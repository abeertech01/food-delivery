import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const stateData = {
  loading: false,
  allProducts: [],
  products: [],
  categorizedProducts: [],
  categorizedProdCount: null,
  resultPerPage: null,
  categories: ["burger", "pizza", "dessert", "beverage"],
};

export const productSlice = createSlice({
  name: "product",
  initialState: stateData,
  reducers: {
    counter(state) {
      state.sum = state.sum + 1;
    },
    // request method may be unnecessary
    getProductsRequest(state) {
      state.loading = true;
      state.allProducts = [];
      state.categorizedProducts = [];
    },
    getProductsSuccess(state, action) {
      state.loading = false;
      state.allProducts = action.payload.allProducts;
      state.products = action.payload.products;
      state.categorizedProducts = action.payload.products;
      state.categorizedProdCount = action.payload.productsCount;
      state.resultPerPage = action.payload.resultPerPage;
    },
  },
});

// export getAllProducts
export const getProducts =
  (keyword = "", currentPage = 1, category) =>
  async (dispatch) => {
    try {
      await dispatch(getProductsRequest());

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}`;

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&category=${category}`;
      }

      const { data } = await axios.get(link);
      dispatch(getProductsSuccess(data));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

// create product
export const uploadProduct = (formData) => {
  return async (dispatch) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    try {
      await axios.post("/api/v1/new-product", formData, config);
    } catch (error) {
      console.log(error);
    }
  };
};

export const { counter, getProductsRequest, getProductsSuccess, newProduct } =
  productSlice.actions;

export default productSlice.reducer;
