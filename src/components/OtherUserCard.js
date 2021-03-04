import { Card, Button, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

const UserCard = (props) => {
  console.log(props);
  return (
    <Card id="result-users">
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
          <Button id="rounded-button" variant="outline-primary">
            Message
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default UserCard;
