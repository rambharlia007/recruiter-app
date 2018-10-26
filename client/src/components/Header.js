import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Route from "react-router-dom/Route";
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
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }
  render() {
    const bgPink = { backgroundColor: "#498fab" };
    return (
      <header>
        <Navbar style={bgPink} dark expand="md" scrolling fixed="top">
          <NavbarBrand href="/">
            <strong>Navbar</strong>
          </NavbarBrand>
          <NavbarToggler onClick={this.onClick} />
          <Collapse isOpen={this.state.collapse} navbar>
            <NavbarNav left>
              <NavItem active>
                <NavLink to="/list/applicant">Applicant</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="#">Features</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="#">Pricing</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="#">Options</NavLink>
              </NavItem>
            </NavbarNav>
            <NavbarNav right>
              <NavItem>
                <NavLink to="#">
                  <Fa icon="facebook" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="#">
                  <Fa icon="twitter" />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="#">
                  <Fa icon="instagram" />
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
