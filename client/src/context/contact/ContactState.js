import { useReducer } from 'react';
import { v4 } from 'uuid';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import { ADD_CONTACT, CLEAR_CURRENT, CLEAR_FILTER, DELETE_CONTACT, FILTER_CONTACTS, SET_CURRENT, UPDATE_CONTACT } from '../Types';

const ContactState = props => {
	const initialState = {
		contacts: [
			{
				id: 1,
				name: 'Jill Johnson',
				email: 'jilljohnson@gmail.com',
				phone: '1111111111',
				type: 'personal'
			},
			{
				id: 2,
				name: 'Sara Watson',
				email: 'sarawatson@gmail.com',
				phone: '2222222222',
				type: 'personal'
			},
			{
				id: 3,
				name: 'Harry White',
				email: 'harrywhite@gmail.com',
				phone: '3333333333',
				type: 'professional'
			}
		],
		current: null,
		filtered: null
	};

	const [state, dispatch] = useReducer(ContactReducer, initialState);

	const addContact = contact => {
		contact.id = v4();
		dispatch({ type: ADD_CONTACT, payload: contact });
	};

	const updateContact = contact => {
		dispatch({ type: UPDATE_CONTACT, payload: contact });
	};

	const deleteContact = id => {
		dispatch({ type: DELETE_CONTACT, payload: id });
	};

	const filterContact = filter => {
		dispatch({ type: FILTER_CONTACTS, payload: filter });
	};

	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
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
			addContact,
			updateContact,
			deleteContact,
			filterContact,
			clearFilter,
			setCurrent,
			clearCurrent
		}}>
		{ props.children }
	</ContactContext.Provider>
};

export default ContactState;