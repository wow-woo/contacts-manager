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

const contactReducer = (state, action) => {
  switch (action.type) {
    case GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false
      };

    case EDIT_SWITCH:
      return {
        ...state,
        editing: !state.editing
      };

    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
        loading: false
      };

    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: null,
        filtered: null,
        error: null,
        current: null
      };

    case CONTACT_ERROR:
      return {
        ...state,
        error: {
          server: action.payload,
          msg: "Email Address already exists",
          type: "danger"
        }
      };

    case DELETE_CONTACT:
      return {
        ...state,
        loading: false,
        editing: state.current
          ? state.current._id !== action.payload
            ? true
            : false
          : false,
        contacts: [
          ...state.contacts.filter(contact => contact._id !== action.payload)
        ],
        filtered:
          state.filtered !== null
            ? state.filtered.filter(contact => contact._id !== action.payload)
            : null
      };

    case SET_CURRENT:
      return {
        ...state,
        editing: true,
        current: action.payload
      };

    case CLEAR_CURRENT:
      return {
        ...state,
        current:
          state.current === null
            ? null
            : state.current._id === action.payload
            ? null
            : state.current
      };

    case UPDATE_CONTACT:
      return {
        ...state,
        editing: false,
        loading: false,
        contacts: state.contacts.map(contact =>
          contact._id === action.payload._id ? action.payload : contact
        )
      };
    case FILTER_CONTACT:
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return contact.name.match(regex) || contact.email.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};

export default contactReducer;
