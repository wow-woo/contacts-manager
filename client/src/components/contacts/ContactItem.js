import React, { useContext } from "react";
import PropTypes from "prop-types";
import ConactContext from "../../contexts/contact/contactContext";

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ConactContext);

  const { deleteContact, setCurrent, clearCurrent } = contactContext;

  const { name, email, phone, type, _id } = contact;

  const onEdit = () => {
    setCurrent(contact);
  };

  const onDelete = () => {
    deleteContact(_id);
    clearCurrent(_id);
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}
        {"  "}{" "}
        <span
          className={
            "badge " + (type === "personal" ? "badge-success" : "badge-primary")
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open"></i>
            {email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone"></i>
            {phone}
          </li>
        )}
      </ul>
      <p>
        <button className="btn btn-dark btn-sm" onClick={onEdit}>
          EDIT
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          DELETE
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};
export default ContactItem;
