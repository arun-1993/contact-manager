import { useReducer } from 'react';
import axios, {} from 'axios';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import { ADD_CONTACT, CLEAR_CONTACTS, CLEAR_CURRENT, CLEAR_FILTER, CONTACT_ERROR, DELETE_CONTACT, FILTER_CONTACTS, GET_CONTACTS, SET_CURRENT, UPDATE_CONTACT } from '../Types';

const ContactState = props => {
	const initialState = {
		contacts: null,
		current: null,
		filtered: null,
		error: null,
		loading: true
	};

	const [state, dispatch] = useReducer(ContactReducer, initialState);
	
	const getContacts = async () => {
		try {
			const response = await axios.get('/api/contacts');

			dispatch({ type: GET_CONTACTS, payload: response.data });
		} catch (error) {
			dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
		}
	};

	const addContact = async contact => {
		const config =  {
			headers: {
				'Content-Type': 'application/json'
			}
		}

		try {
			const response = await axios.post('/api/contacts', contact, config);

			dispatch({ type: ADD_CONTACT, payload: response.data });
		} catch (error) {
			dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
		}
	};

	const updateContact = contact => {
		dispatch({ type: UPDATE_CONTACT, payload: contact });
	};

	const deleteContact = async id => {
		try {
			await axios.delete(`/api/contacts/${id}`);

			dispatch({ type: DELETE_CONTACT, payload: id });
		} catch (error) {
			dispatch({ type: CONTACT_ERROR, payload: error.response.msg})
		}
	};

	const filterContact = filter => {
		dispatch({ type: FILTER_CONTACTS, payload: filter });
	};

	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	const clearContacts = () => {
		dispatch({ type: CLEAR_CONTACTS });
	};

	const setCurrent = contact => {
		dispatch({ type: SET_CURRENT, payload: contact });
	};

	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	return <ContactContext.Provider
		value={{
			contacts: state.contacts,
			current: state.current,
			filtered: state.filtered,
			error: state.error,
			loading: state.loading,
			getContacts,
			addContact,
			updateContact,
			deleteContact,
			filterContact,
			clearFilter,
			clearContacts,
			setCurrent,
			clearCurrent
		}}>
		{ props.children }
	</ContactContext.Provider>
};

export default ContactState;
