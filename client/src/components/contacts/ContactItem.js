import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/ContactContext';

const ContactItem = ({ contact }) => {
	const contactContext = useContext(ContactContext);

	const { deleteContact, setCurrent, clearCurrent } = contactContext;
	const { _id, name, email, phone, type } = contact;

	const onEdit = () => {
		setCurrent(contact);
	};

	const onDelete = () => {
		deleteContact(_id);
		clearCurrent();
	};

	return (
		<div className='card bg-light'>
			<h3 className='text-primary text-left'>
				{ name }
				<span className={ 'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary') } style={{ float: 'right' }}>
					{ type.charAt(0).toUpperCase() + type.slice(1) }
				</span>
			</h3>
			<ul className='list'>
				{ email && (
					<li>
						<i className='fa-solid fa-envelope' /> { email }
					</li>
				) }
				{ phone && (
					<li>
						<i className='fa-solid fa-phone' /> { phone }
					</li>
				) }
			</ul>
			<p>
				<button className='btn btn-dark btn-sm' onClick={ onEdit }>Edit</button>
				<button className='btn btn-danger btn-sm' onClick={ onDelete }>Delete</button>
			</p>
		</div>
	)
}

ContactItem.propTypes = {
	contact: PropTypes.object.isRequired
}

export default ContactItem