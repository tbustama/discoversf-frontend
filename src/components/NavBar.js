import React from "react";
import { Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import { connect } from "react-redux";
import { logOut } from "../Redux/Actions/User";
const NavBar = (props) => {
  return (
    <Navbar className="navbar" fixed="top">
      <LinkContainer to="/" style={{ color: "white" }}>
        <Navbar.Brand>Discoverhood</Navbar.Brand>
      </LinkContainer>
      <Nav className="mr-auto">
        <LinkContainer to="/home" style={{ color: "white" }}>
          <Nav.Link>Home</Nav.Link>
        </LinkContainer>
      </Nav>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        {props.user ? (
          <>
            <LinkContainer to="/forum" style={{ color: "white" }}>
              <Nav.Link>Forum</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/userpage" style={{ color: "white" }}>
              <Nav.Link>Profile</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/home" style={{ color: "white" }}>
              <Nav.Link
                onClick={() => (localStorage.clear(), props.login("DEFAULT"))}
              >
                Log Out
              </Nav.Link>
            </LinkContainer>
          </>
        ) : (
          <LinkContainer to="/signup" style={{ color: "white" }}>
            <Nav.Link>Sign In/ Sign Up</Nav.Link>
          </LinkContainer>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = (state) => {
  return { user: state.UserLogIn.user };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(logOut(user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
