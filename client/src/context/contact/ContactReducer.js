import { ADD_CONTACT, CLEAR_CONTACTS, CLEAR_CURRENT, CLEAR_FILTER, CONTACT_ERROR, DELETE_CONTACT, FILTER_CONTACTS, GET_CONTACTS, SET_CURRENT, UPDATE_CONTACT } from '../Types';

const ContactReducer = (state, action) => {
	switch(action.type) {
		case GET_CONTACTS:
			return {
				...state,
				contacts: action.payload,
				loading: false
			};

		case ADD_CONTACT:
			return {
				...state,
				contacts: [action.payload, ...state.contacts],
				loading: false
			};

		case UPDATE_CONTACT:
			return {
				...state,
				contacts: state.contacts.map(contact => contact._id === action.payload._id ? action.payload : contact),
				loading: false
			};

		case DELETE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter(contact => contact._id !== action.payload),
				loading: false
			};

		case CONTACT_ERROR:
			return {
				...state,
				error: action.payload
			}

		case FILTER_CONTACTS:
			return {
				...state,
				filtered: state.contacts.filter(contact => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					return contact.name.match(regex) || contact.email.match(regex);
				}),
				loading: false
			};

		case CLEAR_FILTER:
			return {
				...state,
				filtered: null
			};

		case CLEAR_CONTACTS:
			return {
				...state,
				contacts: null,
				current: null,
				filtered: null,
				error: null,
				loading: true
			}

		case SET_CURRENT:
			return {
				...state,
				current: action.payload
			};

		case CLEAR_CURRENT:
			return {
				...state,
				current: null
			};

		default:
			return state;
	}
};

export default ContactReducer;
