import { SET_ALERT, REMOVE_ALERT } from "../types";

const alertReducer = (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        alerts: [...state.alerts, action.payload]
      };

    case REMOVE_ALERT:
      return { ...state, alerts: [] };

    // return {
    //   ...state,
    //   alerts: state.alerts.filter(
    //     alert => alert.id_random !== action.payload.id_random
    //   )
    // };

    default:
      return state;
  }
};

export default alertReducer;
