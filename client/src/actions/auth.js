import { LOGIN_SUCCESS, LOGIN_FAILURE, AUTH_ERROR, USER_LOGOUT } from "./types";
import axios from "axios";
//login or register with google
export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
//User log out
export const userLogout = () => async (dispatch) => {
  await axios.get("api/auth/logout");
  dispatch({
    type: USER_LOGOUT,
  });
};
