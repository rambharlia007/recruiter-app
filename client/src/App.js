import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import Header from "./components/Header";

import { BrowserRouter as Router, Link } from "react-router-dom";
import Route from "react-router-dom/Route";
import Interviewee from "./components/New/Interviewee";
import { Redirect } from "react-router";
import PrivateRoute from "./components/PrivateRoute";
import AuthService from "./services/auth";
import Applicant from "./components/List/Applicant";
import Test from "./components/List/Test";
import Process from "./components/New/Process";
import datatabletest from "./components/List/datatabletest";

import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "bootstrap/dist/js/bootstrap.min.js";

var authService = new AuthService();

class App extends Component {
  state = { isAuthenticated: false };
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (authService.getLocalStorageData("id_token")) {
      this.setState({ isAuthenticated: true });
    }
  }

  authenticateCallBackHandler = () => {
    this.setState({ isAuthenticated: true });
  };

  render() {
    return (
      <Router>
        <div>
          {this.state.isAuthenticated && <Header />}

          <Route
            path="/login"
            exact
            strict
            render={props => {
              return (
                <Login
                  {...props}
                  authenticateCallBack={this.authenticateCallBackHandler}
                  isAuthenticated={this.state.isAuthenticated}
                />
              );
            }}
          />
          <main>
            <div style={{ paddingTop: "80px" }}>
              <PrivateRoute
                exact
                path="/new/applicant"
                isAuthenticated={this.state.isAuthenticated}
                component={Interviewee}
              />
              <PrivateRoute
                exact
                path="/"
                isAuthenticated={this.state.isAuthenticated}
                component={Interviewee}
              />
              <PrivateRoute
                exact
                path="/list/applicant"
                isAuthenticated={this.state.isAuthenticated}
                component={Applicant}
              />
              <PrivateRoute
                exact
                path="/list/test"
                isAuthenticated={this.state.isAuthenticated}
                component={Test}
              />
              <PrivateRoute
                exact
                path="/new/process/:id"
                isAuthenticated={this.state.isAuthenticated}
                component={Process}
              />
              <PrivateRoute
                exact
                path="/List/datatabletest"
                isAuthenticated={this.state.isAuthenticated}
                component={datatabletest}
              />
            </div>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
