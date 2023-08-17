const express = require('express');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const router = express.Router();

// @route	POST api/users
// @desc	Register a user
// @access	Public
router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Email is not valid').isEmail(),
		check('password', 'Password should be atleast 6 characters').isLength({ min: 6 })
	],
	async (request, response) => {
		const errors = validationResult(request);
		if(!errors.isEmpty()) {
			return response.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = request.body;

		try {
			let user = await User.findOne({ email });

			if(user) {
				return response.status(400).json({ msg: 'User already exists' });
			}

			user = new User({
				name,
				email,
				password
			});

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

			response.send('User saved');
		} catch(error) {
			console.error(error.message);
			response.status(400).send('Server error');
		}
	}
);

module.exports = router;
