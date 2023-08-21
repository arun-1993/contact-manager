import { useReducer } from 'react';
import { v4 } from 'uuid';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import { ADD_CONTACT, DELETE_CONTACT } from '../Types';

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
		]
	};

	const [state, dispatch] = useReducer(ContactReducer, initialState);

	const addContact = contact => {
		contact.id = v4();
		dispatch({ type: ADD_CONTACT, payload: contact });
	};

	const deleteContact = id => {
		dispatch({ type: DELETE_CONTACT, payload: id });
	};

	return <ContactContext.Provider
		value={{
			contacts: state.contacts,
			addContact,
			deleteContact
		}}>
		{ props.children }
	</ContactContext.Provider>
};

export default ContactState;