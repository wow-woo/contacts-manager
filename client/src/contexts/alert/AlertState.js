import React, { useReducer } from "react";
import AlertContext from "./AlertContext";
import alertReducer from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";
import uuid from "../../utils/uuid";

const AlertState = props => {
  const initialState = {
    alerts: []
  };

  const [state, dispatch] = useReducer(alertReducer, initialState);

  //SET_ALERT
  const setAlert = (msg, type) => {
    const id_random = uuid();

    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id_random }
    });
  };

  //REMOVE_ALERT
  const removeAlert = id => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id
    });
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state.alerts,
        setAlert,
        removeAlert
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
