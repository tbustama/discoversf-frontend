import React from "react";
import { Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NavBar = () => {
  return (
    <Navbar fixed="top">
      <LinkContainer to="/home" style={{ color: "white" }}>
        <Navbar.Brand>Discoverhood</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text style={{ color: "white" }}>Sign In/ Sign Up</Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavBar;
