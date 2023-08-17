const express = require('express');
const user = require('../models/User');
const { check, validationResult } = require('express-validator');

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
	(request, response) => {
		const errors = validationResult(request);
		if(!errors.isEmpty()) {
			return response.status(400).json({ errors: errors.array() });
		} else {
			response.send('Validation passed');
		}
	}
);

module.exports = router;
