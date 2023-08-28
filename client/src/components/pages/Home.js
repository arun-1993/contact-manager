import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/AuthContext';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';

const Home = () => {
	const authContext = useContext(AuthContext);

	const { loadUser } = authContext;

	useEffect(() => {
		loadUser();
	}, []);

	return (
		<div className='grid-2'>
			<div>
				<ContactForm />
			</div>
			<div>
				<ContactFilter />
				<Contacts />
			</div>
		</div>
	)
}

export default Home