import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/login";
import Logout from "./components/logout";
import Signup from "./components/signup";
import Product from "./components/product";
import Cart from "./components/cart";
function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/product" component={Product} />
        <Route path="/cart" component={Cart} />
        <Route path="/logout" component={Logout} />
      </Router>
      {/* <Product /> */}
    </div>
  );
}

export default App;
