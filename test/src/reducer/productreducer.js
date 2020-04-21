import store from "../store/store";
import { fetchProduct } from "../api/api";

const getallproduct = (product = [], action) => {
  if (action.type === "FETCH_PRODUCT") {
    fetchProduct(store);
  }
  if (action.type === "PRODUCT_LOADED") {
    return (product = action.payload);
  }
  return product;
};

export { getallproduct };
