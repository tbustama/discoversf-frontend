import { Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

const UserCard = (props) => {
  console.log(props);
  return (
    <Card
      style={{ width: "30rem" }}
      className="text-center justify-content-end rounded"
    >
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body>
        <Card.Title id="user-title">{props.user.full_name}</Card.Title>
        <Card.Text id="user-card">{props.user.username}</Card.Text>
        <Card.Text id="user-card">
          Bio: <br></br>
          {props.user.bio}
        </Card.Text>
        <LinkContainer to="/userpage/edit">
          <Button variant="primary">Edit Profile</Button>
        </LinkContainer>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
