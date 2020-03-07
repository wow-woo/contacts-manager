import React, { useContext, useEffect } from "react";
import Contacts from "../contacts/Contacts";
import ContactForm from "../contacts/ContactForm";
import EditForm from "../contacts/EditForm";
import ContactContext from "../../contexts/contact/contactContext";
import ContactFilter from "../contacts/ContactFilter";
import AuthContext from "../../contexts/auth/AuthContext";

const Contact = () => {
  const contactContext = useContext(ContactContext);
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  useEffect(() => {
    if (localStorage.getItem("myToken")) loadUser();

    //eslint-disable-next-line
  }, []);

  return (
    <div className="grid-2">
      <div>{contactContext.editing ? <EditForm /> : <ContactForm />}</div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  );
};

export default Contact;
