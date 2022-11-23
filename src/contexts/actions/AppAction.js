import axios, { AxiosError } from "axios";
import { setAuthToken } from "../../utils/SetAuth";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const token = localStorage["TOKEN"];
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const ACTIONS = {
  SET_USER: "SET_USER",
  SET_LOADING: "SET_LOADING",
  SET_MESSAGE: "SET_MESSAGE",
  SET_SUCCESS: "SET_SUCCESS",
  SET_STATUS: "SET_STATUS",
  SET_FIELD_MODAL_LOGIN_FIRST_TIME: "SET_FIELD_MODAL_LOGIN_FIRST_TIME",
  SET_FIELD_MODAL_CHANGE_PASSWORD: "SET_FIELD_MODAL_CHANGE_PASSWORD",
  SET_CANCEL: "SET_CANCEL",
};

export const loadUserAction = () => (dispatch) => {
  setLoadingAction(false)(dispatch);
  setAuthToken(localStorage["TOKEN"]);

  if (localStorage["username"] == undefined) return;
  dispatch({
    type: ACTIONS.SET_USER,
    payload: {
      username: localStorage["username"],
      fullName: localStorage["fullName"],
      enabled: localStorage["enabled"] === "true",
      role: localStorage["role"],
      location: localStorage["location"],
    },
  });
};

export const setLoadingAction = (isLoading) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: isLoading,
  });
};

export const setFieldModalLoginFirstTimeAction =
  (name, value) => (dispatch) => {
    dispatch({
      type: ACTIONS.SET_FIELD_MODAL_LOGIN_FIRST_TIME,
      payload: { name, value },
    });
  };

export const setFieldModalChangePasswordAction =
  (name, value) => (dispatch) => {
    dispatch({
      type: ACTIONS.SET_FIELD_MODAL_CHANGE_PASSWORD,
      payload: { name, value },
    });
  };

export const setStatusAction = (status) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_STATUS,
    payload: status,
  });
};

export const submit_ModalLoginFirstTimeAction =
  (password) => async (dispatch) => {
    setLoadingAction(true)(dispatch);

    const data = {
      newPassword: password,
    };

    await axios
      .put(`${API_ENDPOINT}/v1/auth/changePassword`, data)
      .then((response) => {
        setStatusAction({
          isLoading: false,
          message: "Successful!",
          success: true,
        })(dispatch);

        localStorage["enabled"] = true;
        loadUserAction()(dispatch);
      })
      .catch((error) => {
        if (error.response == undefined) {
          setStatusAction({
            isLoading: false,
            message: error.message,
            success: false,
          })(dispatch);
        } else {
          setStatusAction({
            isLoading: false,
            message: error.response.data.message,
            success: false,
          })(dispatch);
        }
      });
  };
