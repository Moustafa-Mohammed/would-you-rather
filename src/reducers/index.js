import { combineReducers } from "redux";
import users from "./users";
import questions from "./questions";
import loginUser from "./loginUser";
import { loadingBarReducer } from "react-redux-loading";

export default combineReducers({
  users,
  questions,
  loginUser,
  loadingBar: loadingBarReducer,
});
