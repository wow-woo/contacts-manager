import React, { useContext, useState, useEffect } from "react";
import ContactContext from "../../contexts/contact/contactContext";
import AlertContext from "../../contexts/alert/AlertContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const alertContext = useContext(AlertContext);

  const { addContact, current, error, clearError } = contactContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal"
      });
    }

    if (error) {
      setAlert(error.msg, error.type);
      clearError();
    }

    //eslint-disable-next-line
  }, [current, error]);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal"
  });

  const { name, email, phone, type } = contact;

  const onSubmit = async e => {
    e.preventDefault();

    addContact(contact);

    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal"
    });
  };

  const onChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">Add contact</h2>
      <input
        type="text"
        placeholder="name"
        name="name"
        value={name}
        onChange={onChange}
        required
      />
      <input
        type="email"
        placeholder="email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="phone"
        name="phone"
        value={phone}
        onChange={onChange}
        required
      />
      <h5>contact type</h5>
      <label htmlFor="personal">personal</label>
      <input
        id="personal"
        type="radio"
        name="type"
        value="personal"
        checked={type === "personal"}
        onChange={onChange}
      />
      <label htmlFor="bussiness">bussiness</label>
      <input
        id="bussiness"
        type="radio"
        name="type"
        value="bussiness"
        checked={type === "bussiness"}
        onChange={onChange}
      />
      <div>
        <input
          type="submit"
          value="ADD"
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

export default ContactForm;
