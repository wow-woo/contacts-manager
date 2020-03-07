import React, { useReducer } from "react";
import contactContext from "./contactContext";
import axios from "axios";
import contactReducer from "./contactReducer";
import {
  EDIT_SWITCH,
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS,
  CLEAR_ERROR
} from "../types";

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    editing: false,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  //ADD_CONTACT
  const addContact = async newContact => {
    const requestConfig = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/contacts", newContact, requestConfig);

      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.data });
    }
  };

  //GET_CONTACTS
  const getContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");

      dispatch({
        type: GET_CONTACTS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      });
    }
  };

  //UPDATE_CONTACT
  const updateContact = async contact => {
    const requestConfig = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        requestConfig
      );

      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.data.msg
      });
    }
  };

  //DELETE_CONTACT
  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`);

      dispatch({
        type: DELETE_CONTACT,
        payload: id
      });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.data.msg });
    }
  };

  //CLEAR_CONTACTS
  const clearContacts = () => {
    dispatch({
      type: CLEAR_CONTACTS
    });
  };

  //EDIT_SWITCH
  const editSwitch = () => {
    dispatch({
      type: EDIT_SWITCH
    });
  };

  //SET_CURRENT - editContact
  const setCurrent = contact => {
    dispatch({
      type: SET_CURRENT,
      payload: contact
    });
  };

  //CLEAR_CURRENT
  const clearCurrent = id => {
    dispatch({
      type: CLEAR_CURRENT,
      payload: id
    });
  };

  //FILTER_CONTACT
  const filterContact = text => {
    dispatch({
      type: FILTER_CONTACT,
      payload: text
    });
  };

  //CLEAR_FILTER
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    });
  };

  //CLEAR_ERROR
  const clearError = () => {
    dispatch({
      type: CLEAR_ERROR
    });
  };

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        editing: state.editing,
        filtered: state.filtered,
        error: state.error,
        filterContact,
        clearFilter,
        editSwitch,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        getContacts,
        clearContacts,
        clearError
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
