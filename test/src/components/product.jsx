import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchallproduct, addtocart } from "../action/action";
function Product() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchallproduct());
  }, []);

  const handleClick = (data) => {
    const { _id, title, Description, image, price } = data;
    const dat = {
      _id: _id,
      title: title,
      Description: Description,
      image: image,
      price: price,
      qty: 1,
    };
    // console.log(dat);
    dispatch(addtocart(dat));
  };
  const product = useSelector((state) => state.product.data);
  const red = () => {
    const token = localStorage.getItem("user");
    if (!token) {
      return <Redirect to="/" />;
    }
  };
  return (
    <>
      {console.log(product)}
      {red()}
      <div className="container">
        <Link to="/logout" className="btn btn-info mr-auto">
          Logout
        </Link>
        <div className="row">
          {product
            ? product.map((i) => {
                return (
                  <div className="row mx-3 my-3" key={i._id}>
                    <div class="card" style={{ width: "18rem" }}>
                      <img
                        class="card-img-top"
                        src={i.image}
                        alt="Card image cap"
                      />
                      <div class="card-body">
                        <h5 class="card-title">{i.title}</h5>
                        <p class="card-text">{i.Description}</p>
                      </div>
                      <p className="text-danger font-weight-bold ml-4">
                        <span className="font-weight-bold mr-2 text-success">
                          ₹{i.price}
                        </span>
                        <small className="font-weight-bold">
                          <s>₹{parseInt(i.price) + parseInt(i.price - 300)}</s>
                        </small>
                      </p>
                      <Link to="/cart">
                        <button
                          className="btn btn-primary ml-5 mb-2"
                          onClick={() => handleClick(i)}
                        >
                          ADD to cart
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
}
export default Product;
