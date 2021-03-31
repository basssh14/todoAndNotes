import {
  CREATE_FLAG,
  ERROR_CREATE_FLAG,
  GET_FLAGS,
  ERROR_FLAGS,
} from "./types";
import axios from "axios";
import { setAlert } from "./Alert";

//create a new flag
export const newFlag = (flagData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/flags", flagData, config);
    dispatch({
      type: CREATE_FLAG,
      payload: res.data,
    });
    dispatch(setAlert("Flag created.", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "error"));
      });
    }
    dispatch({
      type: ERROR_CREATE_FLAG,
    });
  }
};
//Get all the flags
export const getFlags = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/flags");
    dispatch({
      type: GET_FLAGS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERROR_FLAGS,
    });
  }
};
