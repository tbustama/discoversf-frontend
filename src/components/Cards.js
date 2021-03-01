import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { addLike } from "../Redux/Actions/Restaurants";
import { connect } from "react-redux";
const Cards = (props) => {
  const createLike = (user, restaurant) => {
    fetch("http://localhost:3000/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        reservation: {
          user_id: user.id,
          restaurant_id: restaurant.id,
        },
      }),
    })
      .then((r) => r.json())
      .then((restaurant) => props.like(restaurant));
  };
  console.log(props);
  return (
    <>
      <Card className="netflix-card bg-dark rounded">
        <Card.Img
          src={props.restaurant.img_url}
          alt="card-image hello"
          className="card-image position-relative"
        />

        <Card.ImgOverlay>
          <Card.Title className="card-title d-flex justify-content-center">
            {props.restaurant.name}
          </Card.Title>
          <Row>
            <Col></Col>
            <Col>
              <Card.Text className="card-text">
                <h5>Our Take</h5>
                {props.restaurant.description}
                <br></br>
                <br></br>
                <p>
                  {props.restaurant.users.length > 0 &&
                    props.restaurant.users[0].username}
                  {props.restaurant.users.length > 1
                    ? ` and ${
                        props.restaurant.users.length - 1
                      } others are going`
                    : " is going"}
                </p>

                <a
                  target="_blank"
                  rel="noreferrer"
                  href={props.restaurant.yelp_url}
                >
                  Yelp Link
                </a>
                <br></br>
                {props.user && (
                  <Button
                    onClick={() => createLike(props.user, props.restaurant)}
                  >
                    Like
                  </Button>
                )}
              </Card.Text>
            </Col>
          </Row>
        </Card.ImgOverlay>
      </Card>
    </>
  );
};
const mapStateToProps = (state) => {
  return { restaurants: state.RestaurantReducer.restaurants };
};
const mapDispatchToProps = (dispatch) => {
  return {
    like: (like) => dispatch(addLike(like)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cards);
