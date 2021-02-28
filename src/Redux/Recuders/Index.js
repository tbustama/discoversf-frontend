import { combineReducers } from "redux";
import LoggedOn from "./LoggedOn";
import UserLogIn from "./UserLogIn";
import RestaurantReducer from "./RestaurantReducer";
export const rootReducer = combineReducers({
  LoggedOn,
  UserLogIn,
  RestaurantReducer,
});
