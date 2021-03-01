import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Search from "./components/Search";
import NavBar from "./components/NavBar";
import React from "react";
import LandingPage from "./components/LandingPage";
import { fadeOut } from "./Redux/Actions/Fade";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { userMethod } from "./Redux/Actions/User";
import CardsContainer from "./containers/CardsContainer";
import { fetchRestaurants } from "./Redux/Actions/Restaurants";
import UserCard from "./components/UserCard";
import UserEdit from "./components/UserEdit";
class App extends React.Component {
  persistUser = (token) => {
    fetch("http://localhost:3000/api/v1/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((r) => r.json())
      .then((user) => {
        this.props.login(user.user);
      });
  };

  getRestaurants = () => {
    fetch("http://localhost:3000/restaurants", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((restaurants) => this.props.getRestaurant(restaurants));
  };
  componentDidMount = () => {
    setTimeout(() => this.props.fadeOut(), 4000);
    const token = localStorage.token;
    token && this.persistUser(token);
    this.getRestaurants();
  };
  render() {
    return (
      <Router>
        <Route
          exact
          path="/"
          render={() => (
            <div className="App">
              {this.props.loggedOn ? (
                <>
                  <NavBar />
                  <Search />{" "}
                </>
              ) : (
                <LandingPage />
              )}
            </div>
          )}
        />
        <Route
          exact
          path="/results"
          render={() => (
            <div className="main">
              <NavBar />
              <Container id="search-container">
                <Row id="results-row">
                  <Col xs={6} md={4} id="results-col2">
                    {this.props.filters &&
                      `Our favorite
                    ${
                      this.props.filters.nativeEvent.submitter.value == "food"
                        ? "places to get dinner"
                        : "places to get drinks"
                    }
                    ${
                      this.props.filters.target.casual.value
                        ? " on a casual night out"
                        : " for a special occassion"
                    }
                    in the ${this.props.filters.target.area.value} district`}
                  </Col>
                  <Col xs={12} md={8} id="results-col">
                    <CardsContainer />
                  </Col>
                </Row>
              </Container>
            </div>
          )}
        />
        <Route
          exact
          path="/home"
          render={() => (
            <div className="App">
              <NavBar />
              <Search />
            </div>
          )}
        />
        <Route
          exact
          path="/signup"
          render={() => (
            <>
              <NavBar />
              <SignUp />
            </>
          )}
        />
        <Route
          exact
          path="/signin"
          render={() => (
            <>
              <NavBar />
              <SignIn />
            </>
          )}
        />
        <Route
          exact
          path="/userpage"
          render={() => (
            <div className="App">
              <NavBar /> <UserCard user={this.props.user} />
            </div>
          )}
        />
        <Route
          exact
          path="/userpage/edit"
          render={() => (
            <>
              <NavBar /> <UserEdit user={this.props.user} />
            </>
          )}
        />
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedOn: state.LoggedOn.loggedOn,
    user: state.UserLogIn.user,
    restaurants: state.RestaurantReducer.restaurants,
    filters: state.RestaurantReducer.filterString,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fadeOut: () => dispatch(fadeOut()),
    login: (user) => dispatch(userMethod(user)),
    getRestaurant: (restaurants) => dispatch(fetchRestaurants(restaurants)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
