import React, { Component } from "react";
import "./Login.css";
import { Redirect } from "react-router";
import AuthService from "../services/auth";
import axios from "axios";

import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const responseFacebook = (response) => {
  console.log(response);
}

let x = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    // "Access-Control-Allow-Headers":'Origin, Content-Type, X-Auth-Token'
  }
}

class Login extends Component {
  state = { userName: "", password: "", isUserLoggedIn: false };

  constructor(props) {
    super(props);
    this.auth = new AuthService();
  }

  HandleInputChange = event => {
    var name = event.target.name;
    this.setState({
      [name]: event.target.value
    });
  };

  Authenticate = () => {
    var self = this;
    this.auth.login().then(data => {
      self.setState({ isUserLoggedIn: true });
      self.props.authenticateCallBack(true);
    });
  };


  AuthenticateByGoogle = () => {
    axios.get('http://localhost:5000/auth/google')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  responseGoogle = (response) => {
    console.log(response);
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/list/applicant" />;
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
                    onClick={() => { this.Authenticate() }}
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
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
              />
            </div>
            <div className="col-md-12 pt15 pl0">
              <FacebookLogin
                appId="697493127302600"
                autoLoad={true}
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass="btn-facebook"
                icon="fa-facebook"
                size="btn-lg"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
