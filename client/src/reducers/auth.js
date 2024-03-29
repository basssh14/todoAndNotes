import {
  LOGIN_SUCCESS,
  AUTH_ERROR,
  USER_LOGOUT,
  DELETE_USER,
} from "../actions/types";
const initialState = {
  isAuthenticated: null,
  loading: true,
  user: null,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    case AUTH_ERROR:
    case USER_LOGOUT:
    case DELETE_USER:
      return {
        ...initialState,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return {
        ...state,
      };
  }
}
