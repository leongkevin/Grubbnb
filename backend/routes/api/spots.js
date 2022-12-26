const express = require('express');

const { requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/', async (req, res) => {
	const allSpots = await Spot.findAll();
	res.json(allSpots);
});

// Create a Spot
router.post('/', requireAuth, async (req, res) => {
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

	// Body validation error
	for (let key in req.body) {
		if (!key)
			return res.status(400).json({
				message: 'Validation Error',
				statusCode: 400,
				errors: [
					'Street address is required',
					'City is required',
					'State is required',
					'Country is required',
					'Latitude is not valid',
					'Longitude is not valid',
					'Name must be less than 50 characters',
					'Description is required',
					'Price per day is required',
				],
			});
	}

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
	// Successful Response
	res.status(201).json({ createSpot });
});

// Edit a Spot
router.put('/:spotId', requireAuth, async (req, res) => {
	// const id = req.params.spotId;
	const id = req.user.id;
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

	// findByPk
	// The findByPk method obtains only a single entry from the table, using the provided primary key.
	// let spot = await Spot.findByPk({req.user.id});
	// if (spot === null) {
	// 	const error = res.status(404).json({
	// 		message: "Spot couldn't be found",
	// 		statusCode: 404,
	// 	});
	// 	return error;
	// }

	// if (req.user.id === spot) {
	// 	spot.set({
	// 		address,
	// 		city,
	// 		state,
	// 		country,
	// 		lat,
	// 		lng,
	// 		name,
	// 		description,
	// 		price,
	// 	});
	// 	await spot.save();
	// 	res.json();
	// }

	// res.json({ message: `ownerId is: ${req.user.id}` });
// let { req.params.spotId } = req.user.id
	res.json({ message: `ownerId is: ${req.params.spotId}` });
});

module.exports = router;
