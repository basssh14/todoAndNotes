import {
  CREATE_NOTE,
  ERROR_NOTE,
  GET_NOTES,
  FAIL_NOTES,
  DELETE_NOTE,
  UPDATE_NOTE,
} from "./types";
import axios from "axios";
import { setAlert } from "./Alert";

//get all the notes

export const getNotes = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/notes");
    dispatch({
      type: GET_NOTES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FAIL_NOTES,
    });
  }
};

//create a new note
export const createNote = (noteData, flagId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(`/api/notes/new/${flagId}`, noteData, config);
    dispatch({
      type: CREATE_NOTE,
      payload: res.data,
    });
    dispatch(setAlert("Note added successfully", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "error"));
      });
    }
    if (flagId === "") {
      dispatch(setAlert("Please select a flag", "error"));
    }
    dispatch({
      type: ERROR_NOTE,
    });
  }
};

//update the note
export const updateNote = (noteData, note_id, flag_id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      `/api/notes/${note_id}/${flag_id}`,
      noteData,
      config
    );
    dispatch({
      type: UPDATE_NOTE,
      payload: res.data,
    });
    dispatch(setAlert("Note updated.", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "error"));
      });
    }
    dispatch({
      type: ERROR_NOTE,
    });
  }
};

//delete a note
export const deleteNote = (note_id) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/notes/delete/${note_id}`);
    dispatch({
      type: DELETE_NOTE,
      payload: res.data,
    });
    dispatch(setAlert("Note deleted successfully", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "error"));
      });
    }
    dispatch({
      type: ERROR_NOTE,
    });
  }
};
