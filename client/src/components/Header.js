import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Route from "react-router-dom/Route";
import CommonService from "../services/common";
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink,
  Fa
} from "mdbreact";
import Login from "./Login";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    };
    this.commonService = new CommonService();
    const currentRole = this.commonService.getLocalStorageData("role");
    this.onClick = this.onClick.bind(this);
  }

  logout = () => {
    this.commonService.removeLocalStorageData();
    window.location.reload();
  };

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }
  render() {
    const bgPink = {
      backgroundColor: "#498fab",
      borderBottom: "3px solid #343a405e"
    };
    return (
      <header className="header-pad">
        <Navbar style={bgPink} dark expand="md" scrolling fixed="top">
          <NavbarBrand href="/">
            {/* <img src="../../favicon.ico" width="30" height="30" alt="" alt="" /> */}
            <strong>DevOn</strong>
          </NavbarBrand>
          <NavbarToggler onClick={this.onClick} />
          <Collapse isOpen={this.state.collapse} navbar>
            <NavbarNav left>
              {this.commonService.isAdmin() && (
                <NavItem>
                  <NavLink to="/list/applicant">Applicant</NavLink>
                </NavItem>
              )}

              <NavItem>
                <NavLink to="/new/applicant">New Applicant</NavLink>
              </NavItem>
              {this.commonService.isAdmin() && (
                <NavItem>
                  <NavLink to="/list/profile">User</NavLink>
                </NavItem>
              )}
              {this.commonService.isAdmin() && (
                <NavItem>
                  <NavLink to="/list/opening">Openings</NavLink>
                </NavItem>
              )}
              {this.commonService.isAdmin() && (
                <NavItem>
                  <NavLink to="/new/opening">New Opening</NavLink>
                </NavItem>
              )}
              <NavItem>
                <NavLink
                  to="#"
                  onClick={() => {
                    this.logout();
                  }}
                >
                  Logout
                </NavLink>
              </NavItem>
            </NavbarNav>

            <NavbarNav right>
              <NavItem>
                <NavLink to="#">
                  <img
                    style={{ width: 35, height: 25, paddingRight: 5 }}
                    src={this.commonService.getLocalStorageData("image")}
                    class="img-circle"
                    alt=""
                  />
                  Logged in as {this.commonService.getLocalStorageData("name")}
                </NavLink>
              </NavItem>
            </NavbarNav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}

export default Header;
