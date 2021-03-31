import { combineReducers } from "redux";
import auth from "./auth";
import todos from "./todos";
import flag from "./flag";
import alert from "./alert";
import notes from "./notes";

export default combineReducers({
  auth,
  todos,
  flag,
  alert,
  notes,
});
