const express = require('express');

const { requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Body validation error
// {
// 	"message": "Validation Error",
// 	"statusCode": 400,
// 	"errors": [
// 		"Street address is required",
// 		"City is required",
// 		"State is required",
// 		"Country is required",
// 		"Latitude is not valid",
// 		"Longitude is not valid",
// 		"Name must be less than 50 characters",
// 		"Description is required",
// 		"Price per day is required"
// 	]
// }

// Express validator checks before running against the database so that there isn't a sqlite error
const validateSpot = [
	check('address').isString().withMessage('Street address is required'),
	check('city').isString().withMessage('City is required'),
	check('state').isString().withMessage('State is required'),
	check('country').isString().withMessage('Country is required'),
	check('lat').isDecimal().withMessage('Latitude is not valid'),
	check('lng').isDecimal().withMessage('Longitude is not valid'),
	check('name')
		.isString()
		.not()
		.withMessage('Name must be less than 50 characters'),
	check('description').isString().withMessage('Description is required'),
	check('price').isDecimal().withMessage('Price per day is required'),
	handleValidationErrors,
];

// Test validation errors
// {
// 	"address": null,
// 	"city": null,
// 	"state": null,
// 	"country": null,
// 	"lat": null,
// 	"lng": null,
// 	"name": null,
// 	"description": null,
// 	"price": null
// }

router.get('/', async (req, res) => {
	const allSpots = await Spot.findAll();
	res.json(allSpots);
});

// Create a Spot
router.post('/', [requireAuth, validateSpot], async (req, res) => {
	const {
		address,
		city,
		state,
		country,
		lat,
		lng,
		name,
		description,
		price,
	} = req.body;

	const createSpot = await Spot.create({
		ownerId: req.user.id,
		address,
		city,
		state,
		country,
		lat,
		lng,
		name,
		description,
		price,
	});
	res.status(201).json(createSpot);
});

// Edit a Spot
router.put('/:spotId', [requireAuth, validateSpot], async (req, res) => {
	// const id = req.params.spotId;
	const id = req.user.id;
	const {
		ownerId,
		address,
		city,
		state,
		country,
		lat,
		lng,
		name,
		description,
		price,
	} = req.body;

	// findByPk
	// The findByPk method obtains only a single entry from the table, using the provided primary key.
	let spot = await Spot.findByPk(req.params.spotId);
	// console.log(spot.address)
	if (spot === null) {
		const error = res.status(404).json({
			message: "Spot couldn't be found",
			statusCode: 404,
		});
		return error;
		// res.json({ message: `success`});
	}

	if (spot.ownerId === req.user.id) {
		// comparing ownerId to logged in user
		spot.set({
			address,
			city,
			state,
			country,
			lat,
			lng,
			name,
			description,
			price,
		});
		await spot.save();
		res.json(spot);
	}

	// res.json({ message: `spotId is: ${spot.id}` });
	// res.json({ message: `spotId is: ${req.user.id}` });
	// res.json({ message: `ownerId is: ${req.params.spotId}`});
});

router.delete('/', [requireAuth, validateSpot], async (req, res) => {
});


module.exports = router;

// "XSRF-Token":"XlMibXoV-s-U9NurOoF4ypskHe2BUXzFELC8"
