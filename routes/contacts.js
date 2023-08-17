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
router.post('/', (request, response) => {
	response.send('Add contact');
});

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
