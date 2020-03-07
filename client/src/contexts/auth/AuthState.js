import AuthContext from "./AuthContext";
import React, { useReducer } from "react";
import authReducer from "./authReducer";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from "../types";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("myToken"),
    isAuthenticated: null,
    currentUser: null,
    loading: true,
    error: null,
    user: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //USER_LOADED
  const loadUser = async () => {
    //@todo - load token into global headers
    if (localStorage.myToken) {
      setAuthToken(localStorage.myToken);
    }

    try {
      const res = await axios.get("/api/auth");
      dispatch({
        type: USER_LOADED,
        payload: res.data.user
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };
  //register user
  const register = async formData => {
    const requestConfig = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/users", formData, requestConfig);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      console.log(res.data);
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }

    loadUser();
  };

  //LOGIN_SUCCESS, LOGIN_FAIL
  const login = async formData => {
    const requestConfig = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/auth", formData, requestConfig);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  //LOGOUT

  const logout = () => {
    dispatch({
      type: LOGOUT
    });
  };

  //CLEAR_ERRORS
  const clearErrors = text => {
    dispatch({
      type: CLEAR_ERRORS,
      payload: text
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        currentUser: state.currentUser,
        loading: state.loading,
        error: state.error,
        loadUser,
        register,
        login,
        logout,
        clearErrors,
        user: state.user
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
