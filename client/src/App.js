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

import Process from "./components/New/Process";
import Job from "./components/New/Job";
import Profile from "./components/List/Profile";
import JobList from "./components/List/JobList.js";

import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
            <div>
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
                path="/new/process"
                isAuthenticated={this.state.isAuthenticated}
                component={Process}
              />
              <PrivateRoute
                exact
                path="/List/profile"
                isAuthenticated={this.state.isAuthenticated}
                isAdmin={this.state.isAdmin}
                component={Profile}
              />
               <PrivateRoute
                exact
                path="/List/opening"
                isAuthenticated={this.state.isAuthenticated}
                isAdmin={this.state.isAdmin}
                component={JobList}
              />
               <PrivateRoute
                exact
                path="/new/opening"
                isAuthenticated={this.state.isAuthenticated}
                isAdmin={this.state.isAdmin}
                component={Job}
              />
            </div>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
