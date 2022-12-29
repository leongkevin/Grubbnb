const express = require('express');

const { requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const statusCode404 = {
	message: "Spot couldn't be found",
	statusCode: 404,
};

// Error Response: Body validation error

// Status Code: 400

// Headers:

// Content-Type: application/json
// Body:

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
	// Get all Spots
	// Returns all the spots.

	// Require Authentication: false

	// Request

	// Method: GET
	// URL: /spots
	// Body: none
	// Successful Response

	// Status Code: 200

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
// Updates and returns an existing spot.

// Require Authentication: true

// Require proper authorization: Spot must belong to the current user

// Request

// Method: PUT

// URL: /api/spots/:spotId

// Successful Response

// Status Code: 200

// Headers:

// Content-Type: application/json
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
	const spot = await Spot.findByPk(req.params.spotId);
	// console.log(spot.address)
	if (spot === null) {
		res.status(404).json(statusCode404);
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
	// res.json({ message: `ownerId is: ${req.user.id}` });
	// res.json({ message: `spotId is: ${req.params.spotId}`});
});

// Delete a Spot
// Deletes an existing spot.

// Require Authentication: true

// Require proper authorization: Spot must belong to the current user

// Request

// Method: DELETE
// URL: /api/spots/:spotId
// Body: none
// Successful Response

// Status Code: 200

// Headers:

// Content-Type: application/json
// Body:

// {
// 	"message": "Successfully deleted",
// 	"statusCode": 200
// }

router.delete('/:spotId', requireAuth, async (req, res) => {
	const spot = await Spot.findByPk(req.params.spotId);
	if (!spot) {
		res.status(404).json(statusCode404);
	} else if (spot.ownerId === req.user.id) {
		await spot.destroy();
		res.status(200).json({
			message: 'Successfully deleted',
			statusCode: 200,
		});
		// res.json({ message: spot});
	}
});

// Get all Spots owned by the Current User
// Returns all the spots owned (created) by the current user.

// Require Authentication: true

// Request

// Method: GET
// URL: /api/user/spots
// Body: none
// Successful Response

// Status Code: 200

router.get('/current', requireAuth, async (req, res) => {
	const currentSpotsOfUser = await Spot.findAll({
		where: { ownerId: req.user.id },
	});
	// console.log(currentSpot.ownerId);
	if (!currentSpotsOfUser[0]) {
		res.status(404).json(statusCode404);
	} else {
		res.status(200).json(currentSpotsOfUser);
	}
});

// Get details of a Spot from an id
// Returns the details of a spot specified by its id.

// Require Authentication: false

// Request

// Method: GET
// URL: /api/spots/:spotId
// Body: none
// Successful Response

// Status Code: 200
router.get('/:spotId', async (req, res) => {
	const spot = await Spot.findByPk(req.params.spotId);
	if (spot === null) {
		res.status(404).json(statusCode404);
	} else {
		res.status(200).json(spot);
	}
});

module.exports = router;

// "XSRF-Token":"XlMibXoV-s-U9NurOoF4ypskHe2BUXzFELC8"
