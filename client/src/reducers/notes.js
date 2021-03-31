import {
  CREATE_NOTE,
  ERROR_NOTE,
  GET_NOTES,
  FAIL_NOTES,
  DELETE_NOTE,
  UPDATE_NOTE,
} from "../actions/types";
const initialState = {
  loading: true,
  notes: null,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_NOTE:
    case GET_NOTES:
    case DELETE_NOTE:
    case UPDATE_NOTE:
      return {
        ...state,
        loading: false,
        notes: payload,
      };
    case FAIL_NOTES:
      return {
        ...state,
        loading: false,
        notes: null,
      };
    case ERROR_NOTE:
    default:
      return {
        ...state,
      };
  }
}
