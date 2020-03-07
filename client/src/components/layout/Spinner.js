import React, { Fragment } from "react";
import spinner from "../../img/spinner.gif";

const Spinner = () => {
  return (
    <Fragment>
      <img className="spinner" src={spinner} alt="loading..." />
    </Fragment>
  );
};

export default Spinner;
