import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Search from "./components/Search";
import NavBar from "./components/NavBar";
import React from "react";
import LandingPage from "./components/LandingPage";
import { fadeOut } from "./Redux/Actions/Fade";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {
  componentDidMount = () => {
    setTimeout(() => this.props.fadeOut(), 4000);
  };

  handleSearch = (e) => {
    // e.target["date-picker"].value;
    // e.target.casual.value;
    // e.target.area.value;
    e.preventDefault();
  };
  render() {
    return (
      <Router>
        {this.props.loggedOn && <NavBar />}
        <Route
          exact
          path="/"
          render={() => (
            <div className="App">
              {this.props.loggedOn ? (
                <Search handleSearch={this.handleSearch} />
              ) : (
                <LandingPage />
              )}
            </div>
          )}
        />
        <Route exact path="/results" render={() => <h1>Taylor</h1>} />
        <Route
          exact
          path="/home"
          render={() => (
            <div className="App">
              <Search />
            </div>
          )}
        />
        <Route />
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedOn: state.LoggedOn.loggedOn,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fadeOut: () => dispatch(fadeOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
