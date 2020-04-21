import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
function Signup() {
  const fields = {
    username: null,
    email: null,
    password: null,
    confpassword: null,
  };
  const [region, setregion] = useState("");
  const [status, setstatus] = useState(false);
  const [error, setError] = useState(fields);
  const [password, setpassword] = useState();
  const valemailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    var created_At = Date.now();
    const email = e.target.email.value,
      region = e.target.region.value,
      username = e.target.username.value,
      password = e.target.password.value;
    // console.log(created_At);

    const value = { email, region, username, password, created_At };
    console.log(value);
    axios
      .post("http://localhost:5000/user/signup", value)
      .then((res) => {
        setstatus(!status);
        // console.log(res);
      })
      .catch((err) => console.log(err));

    //   console.log(email, password, region, username, created_At);
  };

  useEffect(() => {
    axios
      .get("https://freegeoip.app/json/")
      .then((res) => setregion(res.data.region_name));
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "email":
        error.email = valemailRegex.test(value) ? null : "invalid email";
        break;

      case "username":
        error.username =
          value.length < 2 ? "Username must be atleast 2 characters" : null;
        break;
      case "password":
        setpassword(value);
        error.password =
          value.length < 8 ? "Password must be atleast 8 characters" : null;
        break;
      case "confpassword":
        error.confpassword =
          password !== value ? "password does not matched" : null;
        break;
      default:
    }
    setError({ ...error });
  };
  const displayError = (field) => {
    return field ? <small className="text-danger ">{field}</small> : null;
  };
  const red = () => {
    if (status === true) {
      return <Redirect to="/" />;
    }
  };
  return (
    <div className="container">
      {red()}
      <div className="d-flex justify-content-center">
        <div className="mx-auto">
          <h4 className="text-info my-4">signup</h4>
          <hr />
          <form onSubmit={(e) => handleSubmit(e)}>
            <div class="form-group">
              <label for="inputEmail">
                Email
                <input
                  type="email"
                  name="email"
                  class="form-control"
                  placeholder="Email"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </label>
            </div>
            {displayError(error.email)}
            <div class="form-group">
              <label for="inputEmail">
                Region
                <input
                  type="text"
                  name="region"
                  class="form-control"
                  placeholder="Region"
                  value={region}
                  readOnly
                />
              </label>
            </div>
            <div class="form-group">
              <label for="inputEmail">
                Username
                <input
                  type="text"
                  name="username"
                  class="form-control"
                  placeholder="username"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </label>
            </div>
            {displayError(error.username)}
            <div class="form-group">
              <label for="inputPassword">
                Password
                <input
                  type="password"
                  name="password"
                  class="form-control"
                  placeholder="Password"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </label>
            </div>
            {displayError(error.password)}
            <div class="form-group">
              <label for="inputPassword">
                Confirm Password
                <input
                  type="password"
                  name="confpassword"
                  class="form-control"
                  placeholder="confirm Password"
                  onChange={(e) => handleChange(e)}
                  required
                />
              </label>
            </div>
            {displayError(error.confpassword)}
            <div class="form-group">
              <button type="submit" class="btn btn-primary">
                Sign up
              </button>
            </div>
          </form>
          <p>
            Already have Account <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Signup;
