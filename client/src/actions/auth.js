import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  AUTH_ERROR,
  USER_LOGOUT,
  DELETE_USER,
} from "./types";
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
  await axios.get("/api/auth/logout");
  console.log("userLogout");
  dispatch({
    type: USER_LOGOUT,
  });
};
//delete user account
export const deleteUser = () => async (dispatch) => {
  await axios.delete("/api/users/delete");
  console.log("userDeleted");
  dispatch({
    type: DELETE_USER,
  });
};
