import React, { Component } from "react";
import "./Login.css";
import { Redirect } from "react-router";
import Route from "react-router-dom/Route";

const PrivateRoute = ({ component: Component, ...rest }) => {
  var isAuthenticated = { ...rest }.isAuthenticated;
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
