import {
  GET_TODOS,
  FAIL_TODOS,
  ERROR_TODO,
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from "./types";
import axios from "axios";
import { setAlert } from "./Alert";

//get user todos
export const getTodos = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/todos");
    dispatch({
      type: GET_TODOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FAIL_TODOS,
    });
  }
};
//create a new user todo
export const newTodo = (todoData, flagId) => async (dispatch) => {
  if (flagId === "") {
    dispatch({
      type: ERROR_TODO,
    });
    dispatch(setAlert("Please enter a flag type", "error"));
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/api/todos/${flagId}`, todoData, config);
    dispatch({
      type: ADD_TODO,
      payload: res.data,
    });
    dispatch(setAlert("Todo created.", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "error"));
      });
    }
    dispatch({
      type: ERROR_TODO,
    });
  }
};
//delete a todo
export const deleteTodo = (todoIdd) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/todos/delete/${todoIdd}`);
    dispatch({
      type: DELETE_TODO,
      payload: res.data,
    });
    dispatch(setAlert("Todo deleted successfully", "success"));
  } catch (err) {
    dispatch({
      type: ERROR_TODO,
    });
  }
};
//update a todo
export const updateTodo = (todoData, todoId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const data = {
    isCompleted: todoData,
  };
  try {
    const res = await axios.post(`/api/todos/update/${todoId}`, data, config);
    dispatch({
      type: UPDATE_TODO,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "error"));
      });
    }
    dispatch({
      type: ERROR_TODO,
    });
  }
};
