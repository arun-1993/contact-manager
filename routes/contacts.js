const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Contact = require('../models/Contact');
const User = require('../models/User');

const router = express.Router();

// @route	GET api/contacts
// @desc	Get all user contacts
// @access	Private
router.get('/', auth, async (request, response) => {
	try {
		const contacts = await Contact.find({ user: request.user.id }).sort({ date: -1 });
		response.json(contacts);
	} catch (error) {
		response.status(500).send('Server error');
	}
});

// @route	POST api/contacts
// @desc	Add new contact
// @access	Private
router.post(
	'/',
	[
		auth,
		[
			check('name', 'Name is required').not().isEmpty()
		]
	],
	async (request, response) => {
		const errors = validationResult(request);

		if(!errors.isEmpty()) {
			return response.status(400).json({ errors: errors.array() });
		}

		const { name, email, phone, type } = request.body;

		try {
			const newContact = new Contact({
				user: request.user.id,
				name,
				email,
				phone,
				type
			});

			const contact = await newContact.save();

			response.json(contact);
		} catch (error) {
			console.error(error.message);
			response.status(400).send('Server error');
		}
	}
);

// @route	PUT api/contacts/:id
// @desc	Update a contact
// @access	Private
router.put('/:id', auth, async (request, response) => {
	const { name, email, phone, type } = request.body;

	const contactFields = {};
	
	if(name) contactFields.name = name;
	if(email) contactFields.email = email;
	if(phone) contactFields.phone = phone;
	if(type) contactFields.type = type;

	try {
		let contact = await Contact.findById(request.params.id);

		if(!contact) {
			return response.status(404).json({ msg: 'Contact not found' });
		}

		if(contact.user.toString() !== request.user.id) {
			return response.status(401).json({ msg: 'Not authorized' });
		}

		contact = await Contact.findByIdAndUpdate(
			request.params.id,
			{ $set: contactFields },
			{ new: true }
		);

		response.json(contact);
	} catch (error) {
		console.error(error.message);
		response.status(500).send('Server error');
	}
});

// @route	DELETE api/contacts/:id
// @desc	Delete a contact
// @access	Private
router.delete('/:id', auth, async (request, response) => {
	try {
		const contact = await Contact.findById(request.params.id);

		if(!contact) {
			return response.status(404).json({ msg: 'Contact not found' });
		}

		if(contact.user.toString() !== request.user.id) {
			return response.status(401).json({ msg: 'Not authorized' });
		}

		await Contact.findByIdAndRemove(request.params.id);

		response.json({ msg: 'Contact removed' });
	} catch (error) {
		console.error(error.message);
		response.status(500).send('Server error');
	}
});

module.exports = router;
