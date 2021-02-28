import React from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";

import { connect } from "react-redux";
import { userMethod } from "../Redux/Actions/User";
import { useHistory } from "react-router-dom";
const SignIn = (props) => {
  let history = useHistory();
  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          username: e.target.username.value,

          password: e.target.password.value,
        },
      }),
    })
      .then((r) => r.json())
      .then((user) => {
        user.user && props.login(user.user);
        user.user && localStorage.setItem("token", user.jwt);
        user.user ? history.push("/") : alert("Invalid Username or Password");
      });
  };
  console.log(props);
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col></Col>
        <Col>
          <Form
            id="sign-up"
            className="justify-content-md-center"
            onSubmit={(e) => handleLogin(e)}
          >
            <h2>Sign In</h2>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                type="username"
                placeholder="Enter username"
                className="nav-search"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                className="nav-search"
              />
            </Form.Group>

            <Button type="submit">Submit</Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return { user: state.UserLogIn.user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(userMethod(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
