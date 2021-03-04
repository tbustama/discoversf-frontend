import { connect } from "react-redux";
import UserCard from "../components/OtherUserCard";
const UsersContainer = (props) => {
  return (
    <div id="user-result-container">
      {props.resultUsers.map((user) => {
        return <UserCard user={user} />;
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { resultUsers: state.RestaurantReducer.resultUsers };
};

export default connect(mapStateToProps)(UsersContainer);
