import Cards from "../components/Cards";
import { connect } from "react-redux";

const DisplayRow = (props) => {
  console.log(props.restaurants);
  return (
    <div id="card-container">
      {props.restaurants.map((restaurant) => {
        return <Cards restaurant={restaurant} user={props.user} />;
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    restaurants: state.RestaurantReducer.filteredRestaurants,
    user: state.UserLogIn.user,
  };
};
export default connect(mapStateToProps)(DisplayRow);
