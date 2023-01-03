const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const {
	Spot,
	User,
	Review,
	Booking,
	SpotImage,
	ReviewImage,
} = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
	check('email')
		.exists({ checkFalsy: true })
		.isEmail()
		.withMessage('Invalid email.'),
	check('username')
		.exists({ checkFalsy: true })
		.isLength({ min: 4 })
		.withMessage('Username is required'),
	check('username')
		.not()
		.isEmail()
		.withMessage('Username cannot be an email.'),
	check('password')
		.exists({ checkFalsy: true })
		.isLength({ min: 6 })
		.withMessage('Password must be 6 characters or more.'),
	check('firstName')
		.isString()
		.withMessage('First Name is required'),
	check('lastName')
		.isString()
		.withMessage('Last Name is required'),
	handleValidationErrors,
];

// Sign up
router.post('/', validateSignup, async (req, res) => {
	const { email, password, username, firstName, lastName } = req.body;
	const user = await User.signup({
		email,
		username,
		password,
		firstName,
		lastName,
	});

	await setTokenCookie(res, user);
	// return res.status(200).json({user: { user,})
	return res.status(200).json({
		user: {
			id: user.id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			username: user.username,
			token: '',
		},
	});
});

// Find all users
router.get('/', async (req, res) => {
	const allUsers = await User.findAll();
	res.json(allUsers);
});

module.exports = router;
