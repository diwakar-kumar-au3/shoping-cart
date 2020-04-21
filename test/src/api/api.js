import axios from "axios";
import { useDispatch } from "react-redux";
// import store from "../store/store";

function fetchProduct(store) {
  axios
    .get("http://localhost:5000/product", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")),
      },
    })
    .then((res) => {
      store.dispatch({ type: "PRODUCT_LOADED", payload: res.data });
    })
    .catch((err) => console.log(err));
}
// function fetchDetail(store, id) {
//   // console.log(id, store);
//   axios
//     .get(`http://localhost:5000/product/${id}`)
//     .then((res) => {
//       // console.log(res.data);
//       store.dispatch({ type: "DETAIL_LOADED", payload: res.data });
//     })
//     .catch((err) => console.log(err));
// }
export { fetchProduct };
