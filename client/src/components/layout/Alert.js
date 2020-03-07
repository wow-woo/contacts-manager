import React, { useContext, useEffect } from "react";
import AlertContext from "../../contexts/alert/AlertContext";

const Alert = () => {
  const alertContext = useContext(AlertContext);
  const { removeAlert, alerts } = alertContext;

  useEffect(() => {
    console.log("alerts", alerts);
  }, [alerts]);

  return (
    alerts.length > 0 &&
    alerts.map(alert => (
      <div
        key={alert.id_random}
        className={`flex flex-a-i-c flex-j-sb alert alert-${alert.type}`}
      >
        <p>
          <i className="fas fa-info-circle"></i>
          {alert.msg}
        </p>
        <button className="close-alert" onClick={removeAlert}>
          <i class="fas fa-times-circle"></i>
        </button>
      </div>
    ))
  );
};

export default Alert;
