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
import CommonService from "./services/common";
import Applicant from "./components/List/Applicant";
import Test from "./components/List/Test";
import Process from "./components/New/Process";
import Profile from "./components/List/Profile";

import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "bootstrap/dist/js/bootstrap.min.js";

var commonService = new CommonService();

class App extends Component {
  state = { isAuthenticated: false, isAdmin: false };
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (commonService.getLocalStorageData("token")) {
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
                isAdmin={this.state.isAdmin}
                component={Applicant}
              />
              <PrivateRoute
                exact
                path="/new/process/:id"
                isAuthenticated={this.state.isAuthenticated}
                component={Process}
              />
              <PrivateRoute
                exact
                path="/List/profile"
                isAuthenticated={this.state.isAuthenticated}
                isAdmin = {this.state.isAdmin}
                component={Profile}
              />
            </div>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
