import { connect } from "react-redux";

const UsersContainer = (props) => {
  return (
    <div id="user-result-container">
      {props.resultUsers.map((user) => (
        <h1>{user.full_name}</h1>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { resultUsers: state.RestaurantReducer.resultUsers };
};

export default connect(mapStateToProps)(UsersContainer);
