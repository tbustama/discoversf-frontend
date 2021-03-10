import React from "react";
import { Card, Button, Row, Col, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  addLike,
  resultUsers,
  selectRestaurant,
} from "../Redux/Actions/Restaurants";
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

  return (
    <>
      <Card
        className="restaurant-card bg-dark rounded"
        id="restaurant"
        onClick={({ target }) => (
          target.closest("#restaurant").classList.toggle("active"),
          target.closest("#restaurant").classList.contains("active")
            ? props.selectedRestaurant(props.restaurant)
            : props.selectedRestaurant(false)
        )}
      >
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
                {props.loggedInUser && (
                  <LinkContainer
                    to="/results/people"
                    style={{ textAlign: "center" }}
                  >
                    <Nav.Link
                      onClick={() => props.userShow(props.restaurant.users)}
                    >
                      {props.restaurant.users.length > 0 &&
                        `${
                          props.restaurant.users[0].id == props.loggedInUser.id
                            ? "You"
                            : props.restaurant.users[0].username
                        }`}
                      {props.restaurant.users.length > 1 &&
                        ` and ${
                          props.restaurant.users.length - 1
                        } others are going`}
                      {props.restaurant.users.length == 1 &&
                        props.restaurant.users[0].id !==
                          props.loggedInUser.id &&
                        " is going"}
                      {props.restaurant.users.length == 1 &&
                        props.restaurant.users[0].id == props.loggedInUser.id &&
                        " are going"}
                    </Nav.Link>
                  </LinkContainer>
                )}
                {props.restaurant.event ? null : (
                  <Nav.Link
                    target="_blank"
                    href={props.restaurant.yelp_url}
                    style={{ marginLeft: "35%" }}
                  >
                    Yelp Link
                  </Nav.Link>
                )}

                {props.user && (
                  <Button
                    style={{ marginLeft: "40%", borderRadius: "10px" }}
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
  return {
    restaurants: state.RestaurantReducer.restaurants,
    mapRestaurant: state.RestaurantReducer.mapRestaurant,
    loggedInUser: state.UserLogIn.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    like: (like) => dispatch(addLike(like)),
    userShow: (users) => dispatch(resultUsers(users)),
    selectedRestaurant: (restaurant) => dispatch(selectRestaurant(restaurant)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cards);
