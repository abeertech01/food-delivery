import axios from "axios";

const url = "http://localhost:4000/api";

export const fetchProducts = async () => {
  return await axios.get(`${url}/products`);
};
