import React, { useContext, useState, useEffect } from "react";
import ContactContext from "../../contexts/contact/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { current, clearCurrent, updateContact, editSwitch } = contactContext;

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
  }, [current]);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal"
  });

  const onCancel = () => {
    editSwitch();
    clearCurrent(contact.id);
  };

  const onSubmit = e => {
    e.preventDefault();

    updateContact(contact);
    clearCurrent(contact.id);

    setContact({
      name: "",
      email: "",
      phone: "",
      type: "personal"
    });
  };

  const { name, email, phone, type } = contact;

  const onChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 style={{ backgroundColor: "blue", color: "white" }}>Edit contact</h2>
      <h3 className="text-primary">
        <span>{name}</span>
      </h3>
      <h4>
        <span
          className={
            "badge " + (type === "personal" ? "badge-success" : "badge-primary")
          }
        >
          {type}
        </span>
      </h4>
      <input
        type="text"
        placeholder="name"
        name="name"
        value={name}
        onChange={onChange}
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
          value="UPDATE"
          className="btn btn-white btn-block"
          style={{ color: "blue" }}
        />
      </div>
      <div>
        {current && (
          <button className="btn btn-grey btn-block" onClick={onCancel}>
            CLEAR
          </button>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
