import React, { useContext, Fragment } from "react";
import AlertContext from "../../contexts/alert/AlertContext";
import AuthContext from "../../contexts/auth/AuthContext";
import ContactContext from "../../contexts/contact/contactContext";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = ({ title, icon }) => {
  const alertContext = useContext(AlertContext);
  const { removeAlert, alerts } = alertContext;

  const authContext = useContext(AuthContext);
  const { isAuthenticated, user, logout } = authContext;

  const contactContext = useContext(ContactContext);
  const { clearContacts } = contactContext;

  const onMove = async () => {
    if (alerts) removeAlert(alerts.id_random);
  };

  const onLogout = () => {
    logout();
    clearContacts();
  };

  const authLinks = (
    <Fragment>
      <li onClick={onMove}>
        <Link to="/contact">Contact</Link>
      </li>
      <li>hello! {user && user.name}</li>
      <li onClick={onLogout}>
        <a href="#!">
          <i className="fas fa-sign-out-alt"></i>
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li onClick={onMove}>
        <Link to="/register">Sign Up</Link>
      </li>
      <li onClick={onMove}>
        <Link to="/login">Log in</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <Link to="/">
          <i className={icon} /> {title}
        </Link>
      </h1>
      <ul>
        <li onClick={onMove}>
          <Link to="/about">About</Link>
        </li>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: "contact keeper",
  icon: "fas fa-id-card-alt"
};

export default Navbar;
