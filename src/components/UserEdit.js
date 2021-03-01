import { Form, Button, Container, Col, Row, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { userMethod } from "../Redux/Actions/User";
import { useHistory } from "react-router-dom";

const UserEdit = (props) => {
  let history = useHistory();
  const handleLogin = (e) => {
    e.preventDefault();
    const token = localStorage.token;
    fetch("http://localhost:3000/api/v1/user/edit", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        user: {
          username: e.target.username.value,
          full_name: e.target.firstname.value.concat(
            " " + e.target.lastname.value
          ),
          bio: e.target.bio.value,
        },
      }),
    })
      .then((r) => r.json())
      .then((user) => {
        user.user && props.login(user.user);
        user.user ? history.push("/userpage") : alert("Username already taken");
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
            <h2>Edit Profile</h2>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                type="username"
                placeholder="Enter username"
                className="nav-search"
                defaultValue={props.user.username}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Row>
                <Col>
                  <Form.Control
                    placeholder="First name"
                    name="firstname"
                    defaultValue={props.user.full_name.split(" ")[0]}
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder="Last name"
                    name="lastname"
                    defaultValue={props.user.full_name.split(" ")[1]}
                  />
                </Col>
              </Form.Row>
            </Form.Group>

            <Form.Group>
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Bio"
                name="bio"
                className="nav-search"
                defaultValue={props.user.bio}
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

// const mapStateToProps = (state) => {
//   return { user: state.UserLogIn.user };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(userMethod(user)),
  };
};

export default connect(null, mapDispatchToProps)(UserEdit);
