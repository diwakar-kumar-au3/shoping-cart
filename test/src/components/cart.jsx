import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { connect } from "react-redux";
class Cart extends Component {
  constructor() {
    super();
    this.state = { count: 1 };
  }
  // handleClick = () => {
  //   console.log("hi");
  // };
  // increase = () => {
  //   this.setState({ count: this.state.count + 1 });
  // };
  // descrease = () => {
  //   if (this.state.count > 0) {
  //     this.setState({ count: this.state.count - 1 });
  //   }
  // };
  render() {
    const red = () => {
      const token = localStorage.getItem("user");
      if (!token) {
        return <Redirect to="/" />;
      }
    };
    return (
      <>
        {red()}
        {console.log(this.props.cart)}
        <div className="container">
          <Link to="/logout" className="btn btn-info mr-auto">
            Logout
          </Link>
          <div className="row mx-5 my-5">
            {this.props.cart.map((i) => {
              return (
                <>
                  <div className="card mx-3 my-3" style={{ width: "25rem" }}>
                    <img
                      class="card-img-top"
                      src={i.image}
                      style={{ width: "25rem", height: "23rem" }}
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
                    <div className="d-flex">
                      <button
                        className="btn btn-primary ml-5 mb-2"
                        onClick={() => this.props.increase(i._id)}
                      >
                        +
                      </button>
                      <p className="text text-info mt-2 ml-3">{i.qty}</p>
                      <button
                        className="btn btn-primary ml-3 mb-2"
                        onClick={() => this.props.descrease(i._id)}
                      >
                        -
                      </button>
                    </div>
                    <div>
                      <p className="text font-weight-bold mt-2 ml-3">
                        Total Amount Payable: ₹{parseInt(i.price) * i.qty}
                      </p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
const mapStatetoProps = (state) => {
  return {
    cart: state.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    increase: (id) => dispatch({ type: "INC", payload: { id: id, val: 1 } }),
    descrease: (id) => dispatch({ type: "DESC", payload: { id: id, val: 1 } }),
    // life: () => dispatch({ type: "LIFE", value: 250 }),
  };
};
export default connect(mapStatetoProps, mapDispatchToProps)(Cart);
