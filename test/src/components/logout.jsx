import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

function Logout() {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return <Redirect to="/" />;
}
export default Logout;
