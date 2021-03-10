import { Card, Button, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const UserCard = (props) => {
  let history = useHistory();
  const handleSubmit = (e, receiver) => {
    e.preventDefault();
    const token = localStorage.token;
    fetch(`http://localhost:3000/conversations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: `${receiver.full_name},${props.loggedInUser.full_name}`,
        receiver_id: receiver.id,
        sender_id: props.loggedInUser.id,
      }),
    }).then(() => history.push("/forum"));
  };
  return (
    <Card id="result-users" className="bioCard">
      <Row>
        <Col md={9}>
          <Card.Title id="user-title">{props.user.full_name}</Card.Title>
          <Card.Body id="result-users-body">
            <Card.Text className="user-card">{props.user.username}</Card.Text>
            <Card.Text className="user-card">
              Bio: <br></br>
              {props.user.bio}
            </Card.Text>
          </Card.Body>
        </Col>
        <Col md={3}>
          {props.user.id !== props.loggedInUser.id && (
            <Button
              id="rounded-button"
              variant="outline-primary"
              onClick={(e) => {
                handleSubmit(e, props.user);
              }}
            >
              Message
            </Button>
          )}
        </Col>
      </Row>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return { loggedInUser: state.UserLogIn.user };
};

export default connect(mapStateToProps)(UserCard);
