import React from "react";
import { Form, Button, Container, Col, Row, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { userMethod } from "../Redux/Actions/User";
import { useHistory } from "react-router-dom";

const SignUp = (props) => {
  let history = useHistory();
  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          username: e.target.username.value,
          full_name: e.target.firstname.value.concat(
            " " + e.target.lastname.value
          ),
          password: e.target.password.value,
          bio: e.target.bio.value,
        },
      }),
    })
      .then((r) => r.json())
      .then((user) => {
        console.log(user);
        user.user && props.login(user.user);
        user.user && localStorage.setItem("token", user.jwt);
        user.user
          ? history.push("/")
          : alert(
              "Failed to create user. Either username already taken or not all fields were completed"
            );
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
            <h2>Sign Up</h2>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                type="username"
                placeholder="Enter username"
                className="nav-search"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Row>
                <Col>
                  <Form.Control placeholder="First name" name="firstname" />
                </Col>
                <Col>
                  <Form.Control placeholder="Last name" name="lastname" />
                </Col>
              </Form.Row>
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
            <Form.Group>
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Bio"
                name="bio"
                className="nav-search"
              />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
          <LinkContainer
            to="/signin"
            style={{ color: "white", textAlign: "center" }}
          >
            <Nav.Link>Have an account? Sign in here</Nav.Link>
          </LinkContainer>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

// const mapStateToProps = (state) => {
//   return { user: state.UserLogIn.user };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(userMethod(user)),
  };
};

export default connect(null, mapDispatchToProps)(SignUp);
