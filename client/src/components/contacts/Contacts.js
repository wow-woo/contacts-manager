import React, { useContext, Fragment, useEffect } from "react";
import ContactItem from "./ContactItem";
import ContactContext from "../../contexts/contact/contactContext";
import AuthContext from "../../contexts/auth/AuthContext";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Spinner from "../layout/Spinner";

const Contacts = () => {
  const contactContext = useContext(ContactContext);
  const authContext = useContext(AuthContext);

  let { contacts, filtered, getContacts, loading } = contactContext;
  let { loadUser } = authContext;

  useEffect(() => {
    loadUser();
    getContacts();

    //eslint-disable-next-line
  }, []);

  if (filtered !== null) {
    contacts = filtered;
  }

  if (contacts !== null && contacts.length === 0 && !loading) {
    return <h4> you can now register contacts !</h4>;
  }

  return (
    <Fragment>
      {contacts !== null && !loading ? (
        <TransitionGroup>
          {contacts.map(contact => (
            <CSSTransition timeout={500} className="item" key={contact._id}>
              <ContactItem contact={contact} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Contacts;
