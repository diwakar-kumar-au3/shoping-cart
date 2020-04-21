const fetchallproduct = () => {
  return {
    type: "FETCH_PRODUCT",
  };
};
const addtocart = (data) => {
  return {
    type: "ADD_TO_CART",
    payload: data,
  };
};

export { fetchallproduct, addtocart };
