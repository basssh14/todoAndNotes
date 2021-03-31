import {
  GET_TODOS,
  FAIL_TODOS,
  ADD_TODO,
  ERROR_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from "../actions/types";
const initialState = {
  loading: true,
  todos: null,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_TODOS:
    case ADD_TODO:
    case UPDATE_TODO:
    case DELETE_TODO:
      return {
        ...state,
        loading: false,
        todos: payload,
      };
    case FAIL_TODOS:
      return {
        ...state,
        loading: false,
        todos: null,
      };
    case ERROR_TODO:
    default:
      return { ...state };
  }
}
