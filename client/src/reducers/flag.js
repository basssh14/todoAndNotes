import {
  CREATE_FLAG,
  ERROR_CREATE_FLAG,
  GET_FLAGS,
  ERROR_FLAGS,
} from "../actions/types";
const initialState = {
  loading: true,
  flags: null,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_FLAG:
    case GET_FLAGS:
      return {
        ...state,
        loading: false,
        flags: payload,
      };
    case ERROR_FLAGS:
      return {
        ...state,
        loading: false,
        flags: null,
      };
    case ERROR_CREATE_FLAG:
    default:
      return { ...state };
  }
}
