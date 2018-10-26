import React, { Component } from "react";
import "./Login.css";
import { Redirect } from "react-router";
import AuthService from "../services/auth";

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
                    onClick={()=>{this.Authenticate()}}
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
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
