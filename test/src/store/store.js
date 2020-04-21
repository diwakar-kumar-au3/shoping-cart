import { createStore, combineReducers } from "redux";
import { getallproduct } from "../reducer/productreducer";
import { cartReducer } from "../reducer/cartreducer";

let reducer = combineReducers({
  product: getallproduct,
  cart: cartReducer,
});
const store = createStore(reducer);
export default store;
