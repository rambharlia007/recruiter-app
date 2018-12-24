import React, { Component } from "react";
import "./Login.css";
import { Redirect } from "react-router";
import CommonService from "../services/common";
import axios from "axios";

import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import decode from "jwt-decode";

class Login extends Component {
  state = { userName: "", password: "", isUserLoggedIn: false };

  constructor(props) {
    super(props);
    this.commonService = new CommonService();
  }

  HandleInputChange = event => {
    var name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  };

  AuthenticatePassport = ()=>{

    //window.open("http://localhost:5000/auth/google","_self");
    let headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:5000",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      "Access-Control-Allow-Headers": "X-Requested-With,content-type",
      "Access-Control-Allow-Credentials": true,
  }
    axios
    .get("http://localhost:5000/auth/google", headers)
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  Authenticate = () => {
    var self = this;
    // this.auth.login().then(data => {
    //   self.setState({ isUserLoggedIn: true });
    //   self.props.authenticateCallBack(true);
    // });
  };

  setTokenAndRoles = data => {
    var user = decode(data.token);
    this.commonService.setLocalStorageData("role", user.role);
    this.commonService.setLocalStorageData("token", data.token);
    this.commonService.setLocalStorageData("name", user.username);
    this.commonService.setLocalStorageData("image", user.imageUrl);
    this.props.authenticateCallBack(true);
  };

  AuthenticateSocial = payload => {
    var self = this;
    payload.role = this.common;
    axios
      .post("/auth/login", payload)
      .then(function(response) {
        self.setTokenAndRoles(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  responseGoogle = response => {
    var user = {
      userName: response.profileObj.name,
      emailId: response.profileObj.email,
      socialId: response.profileObj.googleId,
      imageUrl: response.profileObj.imageUrl,
      phoneNumber: ""
    };
    this.AuthenticateSocial(user);
  };

  responseFacebook = response => {
    var user = {
      userName: response.name,
      emailId: response.email,
      socialId: response.userID,
      imageUrl: response.picture.data.url,
      phoneNumber: ""
    };
    console.log(response);
    this.AuthenticateSocial(user);
  };

  render() {
    if (this.props.isAuthenticated && this.commonService.isAdmin()) {
      return <Redirect to="/list/applicant" />;
    } else if (this.props.isAuthenticated) {
      return <Redirect to="/new/applicant" />;
    }
    return (
      <div class="login-padding">
        <div class="row justify-content-center">
          <div class="col-md-4 align-self-center align-items-center">
            <div class="card">
              <div class="card-body">
                <form>
                  <div class="login-header div-logo">
                    <a href="javascript:void(0)">
                      <img class="logo" src="../../images/logo1.png" />
                    </a>
                  </div>
                  <div class="form-group">
                    <input
                      type="email"
                      class="form-control"
                      name="userName"
                      placeholder="Enter email"
                      value={this.state.userName}
                      onChange={this.HandleInputChange}
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      class="form-control"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.HandleInputChange}
                    />
                  </div>
                  <button
                    type="submit"
                    class="btn btn-success btn-block text-left"
                    onClick={() => {
                      this.Authenticate();
                    }}
                    disabled={!(this.state.userName && this.state.password)}
                  >
                    <span class="pull-left">
                      {/* <i class="fa fa-lock" /> */}
                      Log In
                    </span>
                    {/* <i class="fa fa-lg fa-spinner fa-spin pull-right" /> */}
                  </button>
                </form>
              </div>
            </div>
            <div className="col-md-12 pt15 pl0">
              <GoogleLogin
                clientId="225239235499-2kcl83lbn7tdga1rhahkg62k5qm9i1ii.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={data => {
                  this.responseGoogle(data);
                }}
                onFailure={this.responseGoogle}
              />
            </div>
            <div className="col-md-12 pt15 pl0">
              <FacebookLogin
                appId="697493127302600"
                autoLoad={false}
                fields="name,email,picture"
                callback={data => {
                  this.responseFacebook(data);
                }}
                cssClass="btn-facebook"
                icon="fa-facebook"
                size="btn-lg"
              />
            </div>
            <button
                    type="submit"
                    class="btn btn-success btn-block text-left"
                    onClick={() => {
                      this.AuthenticatePassport();
                    }}
                  >
                    <span class="pull-left">
                      {/* <i class="fa fa-lock" /> */}
                     Passport
                    </span>
                    {/* <i class="fa fa-lg fa-spinner fa-spin pull-right" /> */}
                  </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
