import React, { Component } from "react";
import "./Login.css";
import { Redirect } from "react-router";
import CommonService from "../services/common";
import axios from "axios";

import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import decode from "jwt-decode";

import MicrosoftLogin from "react-microsoft-login";
import keys from "../config/keys";

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
    this.commonService.setLocalStorageData("id", data.id);
    this.props.authenticateCallBack(true);
  };

  AuthenticateSocial = payload => {
    var self = this;
    payload.role = this.common;
    axios
      .post("/auth/login", payload)
      .then(function (response) {
        self.setTokenAndRoles(response.data);
      })
      .catch(function (error) {
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


  outlookAuthHandler = (err, response) => {
    var user = {
      userName: response.displayName,
      emailId: response.userPrincipalName,
      socialId: response.id,
      imageUrl: "",
      phoneNumber: response.mobilePhone
    };
    this.AuthenticateSocial(user);
  }

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
                <img className="custom-logo" src="../../favicon.ico" alt="" />
                <div><small class="text-muted">Connect DevOn Recruiter App with your favorite social network</small></div>
                <div className="col-md-12 pt15 pl0">
                  <GoogleLogin
                    clientId={keys.google.clientID}
                    onSuccess={data => {
                      this.responseGoogle(data);
                    }}
                    onFailure={this.responseGoogle}
                  >
                    <i class="fab fa-google"></i>
                    <span className="pl10"> Sign in with Google</span>
                  </GoogleLogin>
                </div>
                <div className="col-md-12 pt15 pl0">
                  <MicrosoftLogin
                    authCallback={this.outlookAuthHandler}
                    withUserData={true}
                    clientId={keys.outlook.clientID}
                    authCallback={this.outlookAuthHandler}
                    graphScopes={["user.read"]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}

export default Login;
