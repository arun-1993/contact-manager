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
router.put('/:id', (request, response) => {
	response.send('Update contact');
});

// @route	DELETE api/contacts/:id
// @desc	Delete a contact
// @access	Private
router.delete('/:id', (request, response) => {
	response.send('Delete contact');
});

module.exports = router;
