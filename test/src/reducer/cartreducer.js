import store from "../store/store";
// import { fetchDetail } from "../api/api";

const cartReducer = (cart = [], action) => {
  if (action.type === "ADD_TO_CART") {
    return [...cart, action.payload];
  }
  if (action.type === "INC") {
    //   console.log(
    //     cart
    //       .filter((x) => x._id === action.payload.id)
    //       .map((k) => {
    //         const { _id, title, image, Description, price, qty } = k;
    //         return qty + action.payload.val;
    //       })
    //     // .reduce((i, k) => i + k)
    //   );
    const data = cart.filter((x) => x._id === action.payload.id);
    // const index = cart.findIndex((y) => y._id === action.payload.id);

    const { _id, title, image, Description, price, qty } = data[0];
    console.log(_id, title, image, Description, price);
    const obj = {
      _id: _id,
      title: title,
      image: image,
      Description: Description,
      price: price,
      qty: qty + action.payload.val,
    };
    return (cart = [obj]);
  }
  if (action.type === "DESC") {
    const data = cart.filter((x) => x._id === action.payload.id);
    const index = cart.findIndex((y) => y._id === action.payload.id);

    const { _id, title, image, Description, price, qty } = data[0];
    if (qty > 1) {
      const obj = {
        _id: _id,
        title: title,
        image: image,
        Description: Description,
        price: price,
        qty: qty - action.payload.val,
      };

      return (cart = [obj]);
    } else {
      return (cart = [...cart.slice(1, index)]);
    }
  }
  console.log(cart);
  return cart;
};
export { cartReducer };
