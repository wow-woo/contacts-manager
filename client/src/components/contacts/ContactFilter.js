import React, { useEffect, useContext, useRef } from "react";
import ContactContext from "../../contexts/contact/contactContext";

const ContactFilter = () => {
  const contactContext = useContext(ContactContext);
  const { filterContact, clearFilter, filtered } = contactContext;

  const search_text = useRef("");

  useEffect(() => {
    if (filtered === null) {
      search_text.current.value = "";
    }
  });

  const onChange = e => {
    if (search_text.current.value !== "") {
      filterContact(e.target.value.trim());
    } else {
      clearFilter();
    }
  };
  return (
    <div>
      <form>
        <input
          ref={search_text}
          type="text"
          onChange={onChange}
          placeholder="filter name, email"
        />
      </form>
    </div>
  );
};

export default ContactFilter;
