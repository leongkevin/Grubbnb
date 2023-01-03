const express = require('express');

const { requireAuth, restoreUser } = require('../../utils/auth');
const {
	Spot,
	User,
	Review,
	Booking,
	SpotImage,
	ReviewImage,
} = require('../../db/models');

const { check, body } = require('express-validator');
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

const validateReview = [
	check('review').isString().withMessage('Review text is required'),
	check('stars').isInt().withMessage('Stars must be an integer from 1 to 5'),
	handleValidationErrors,
];

const validateSpotImage = [
	check('url').isString().withMessage('URL is required'),
	check('preview').isBoolean().withMessage('Boolean is required'),
	check('spotId').isInt().withMessage('Id is required'),
	handleValidationErrors,
];

// const validateBooking = [
// 	body('startDate').custom(({ startDate, endDate }) => {
// 		body.startDate
// 	}),
// 	handleValidationErrors,
// ];

// {
// 	"message": "Sorry, this spot is already booked for the specified dates",
// 	"statusCode": 403,
// 	"errors": [
// 		"Start date conflicts with an existing booking",
// 		"End date conflicts with an existing booking"
// 	]
// }

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

// {
// 	"startDate": null,
// 	"endDate": null
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
// Creates and returns a new spot.

// Require Authentication: true

// Request

// Method: POST

// URL: /api/spots

// Successful Response

// Status Code: 201

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
	const findSpot = await Spot.findByPk(req.params.spotId);
	// console.log(spot.address)
	if (findSpot === null) {
		res.status(404).json(statusCode404);
	}

	if (findSpot.ownerId === req.user.id) {
		// comparing ownerId to logged in user
		findSpot.set({
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
		await findSpot.save();
		res.json(findSpot);
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
// URL: /api/spots/current
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

// Create a Review for a Spot based on the Spot's id
// Create and return a new review for a spot specified by id.

// Require Authentication: true

// Request

// Method: POST

// URL: /api/spots/:spotId/reviews

// Headers:

// Content-Type: application/json
// Body:

// {
// 	"review": "This was an awesome spot!",
// 	"stars": 5
// }
// Successful Response

// Status Code: 201
router.post(
	'/:spotId/reviews',
	[requireAuth, validateReview],
	async (req, res) => {
		const { userId, spotId, review, stars } = req.body;
		const spot = req.params;

		const findSpot = await Spot.findAll({
			where: { id: spot.spotId }, // key is "id" but cannot access unless called spotId
		});

		const reviewsBySameUser = await Review.findAll({
			where: { userId: req.user.id }, // Search by user
		});

		// res.status(201).json(reviewsBySameUser);
		//{
		// 	"review": null,
		//	"stars": null
		//}
		// Do not comment out a required column, it will have a sql validation error
		// Must create a new spot before creating a review for a spot

		const arrayOfReviewsBySameUser = [];
		// res.json(spot.spotId);
		for (let i = 0; i < reviewsBySameUser.length; i++) {
			const el = reviewsBySameUser[i];
			// console.log(el.spotId === parseInt(spot.spotId));
			for (const key in el) {
				// res.json({currentEl: el.spotId, currentSpot: spot.spotId});
				// console.log(el.spotId === spot.spotId)
				if (el.spotId === parseInt(spot.spotId)) {
					// String coming from database
					// console.log(spot.spotId);
					arrayOfReviewsBySameUser.push(el.spotId);
				}
			}
		}
		// console.log(arrayOfReviewsBySameUser.length)
		// res.json(arrayOfReviewsBySameUser.length);

		if (findSpot[0] && arrayOfReviewsBySameUser.length < 1) {
			// Spot exists && User review array is not more than 1 review
			const createReview = await Review.create({
				userId: req.user.id,
				spotId: spot.spotId,
				review: req.body.review,
				stars: req.body.stars,
			});
			res.status(201).json(createReview);
		} else if (arrayOfReviewsBySameUser.length >= 1) {
			// Error response: Review from the current user already exists for the Spot
			// Status Code: 403
			res.status(403).json({
				message: 'User already has a review for this spot',
				statusCode: 403,
			});
		} else {
			// 	Error response: Couldn't find a Spot with the specified id

			// 	Status Code: 404
			res.status(404).json(statusCode404);
		}
	}
);

// Get all Reviews by a Spot's id
// Returns all the reviews that belong to a spot specified by id.

// Require Authentication: false

// Request

// Method: GET
// URL: /api/spots/:spotId/reviews
// Body: none
// Successful Response

// Status Code: 200

router.get('/:spotId/reviews', async (req, res) => {
	const { userId, spotId, review, stars } = req.body;
	const spot = req.params;

	const findSpot = await Spot.findAll({
		where: { id: spot.spotId },
	});
	// res.json(findSpot[0].id);

	if (findSpot[0]) {
		const findReview = await Review.findAll({
			where: { spotId: spot.spotId },
			include: [
				{ model: User, attributes: ['id', 'firstName', 'lastName'] },
				{ model: ReviewImage, attributes: ['id', 'url'] },
			],
		});
		res.status(200).json({ Reviews: findReview });
	} else {
		res.status(404).json(statusCode404);
	}
});

// Add an Image to a Spot based on the Spot's id
// Create and return a new image for a spot specified by id.

// Require Authentication: true

// Require proper authorization: Spot must belong to the current user

// Request

// Method: POST

// URL: /api/spot/:spotId/images

// Headers:

// Content-Type: application/json
// Body:

// {
// 	"url": "image url",
// 	"preview": true
// }
// Successful Response

// Status Code: 200

router.post(
	'/:spotId/images',
	[requireAuth, validateSpotImage],
	async (req, res) => {
		const { url, spotId, preview } = req.body;
		const spot = req.params;

		const findSpot = await Spot.findAll({
			where: { id: spot.spotId },
			attributes: { exclude: ['updatedAt', 'createdAt'] },
		});

		if (findSpot[0]) {
			const createSpotImage = await SpotImage.create({
				url,
				spotId: spot.spotId,
				preview,
			});
			res.status(200).json(createSpotImage);
		} else {
			res.status(404).json(statusCode404);
		}
	}
);

// Create a Booking from a Spot based on the Spot's id
// Create and return a new booking from a spot specified by id.

// Require Authentication: true

// Require proper authorization: Spot must NOT belong to the current user

// Request

// Method: POST

// URL: /api/spots/:spotId/bookings

// Body:

// {
// 	"startDate": "2021-11-19",
// 	"endDate": "2021-11-20"
// }
// Successful Response

// Status Code: 200

router.post(
	'/:spotIdForBooking/bookings',
	requireAuth,

	// body('startDate').validator(value, { req, location, path }),
	check('startDate').custom((value, { req }) => {
		const { Op } = require('sequelize');

		// const { startDate } = req.body.startDate;
		// const { endDate } = req.body.endDate;
		// value === req.body.startDate
		// if (req.body.startDate === "2025-11-24") {
		// if (req.body.endDate === "2025-11-25") {

		// const findBookingStartDate = Booking.findAll({
		// 	where: { spotId: req.params.spotIdForBooking },
		// 	attributes: ['startDate'],
		// });

		// const findBookingStartDate = Booking.findAll({
		// 	// where: {
		// 	// 	spotId: req.params.spotIdForBooking,
		// 		// startDate: {
		// 		// 	[Op.gte]: startDate,
		// 		// 	[Op.lte]: endDate,
		// 		// },
		// 	// },
		// 	// attributes: ['startDate'],
		// });

		// // value === req.body.startDate
		// if (!findBookingStartDate[0]) {
		// 	throw new Error(`${findBookingStartDate.length}`)
		// 	// throw new Error('Start date conflicts with an existing booking');
		// }
		// return true;

		return Booking.findAll({
			where: {
				spotId: req.params.spotIdForBooking,
				startDate: {
					[Op.gte]: new Date(req.body.startDate),
					[Op.lte]: new Date(req.body.endDate),
				},
			},
			attributes: ['startDate'],
		}).then((booking) => {
			if (booking.length) {
				// throw new Error(`${booking.length}`);
				// throw new Error(`${req.body.startDate}`);
				throw new Error(
					'Start date conflicts with an existing booking'
				);
			}
		});
		return true;
	}),

	check('endDate').custom((value, { req }) => {
		const { Op } = require('sequelize');

		return Booking.findAll({
			where: {
				spotId: req.params.spotIdForBooking,
				endDate: {
					[Op.gte]: new Date(req.body.startDate),
					[Op.lte]: new Date(req.body.endDate),
				},
			},
			attributes: ['endDate'],
		}).then((booking) => {
			if (booking.length) {
				throw new Error('End date conflicts with an existing booking');
			}
		});
		return true;
	}),

	handleValidationErrors,
	async (req, res) => {
		let { startDate, endDate } = req.body;
		const spot = req.params;

		// return res.json(startDate);

		// const validateBooking = (startDate, endDate) => {

		// }

		const findSpot = await Spot.findByPk(req.params.spotIdForBooking);
		if (findSpot) {
			const findBooking = await Booking.findAll({
				where: { spotId: findSpot.id },
				attributes: ['startDate', 'endDate'],
			});
			// res.json(findSpot);
			// res.json(findBooking.length);
			// if (findBooking.length) {
			// 	startDate = findBooking[0].startDate;
			// 	endDate = findBooking[0].endDate;
			// }
			// res.json(startDate > endDate)
			// res.json(startDate)
			// res.json(endDate)
			// res.json(`${endDate.getFullYear()}-${endDate.getDate()}-${endDate.getMonth()}`);

			// if (endDate < startDate) {
			// 	return res.status(400).json({
			// 		message: 'Validation error',
			// 		statusCode: 400,
			// 		errors: {
			// 			endDate: 'endDate cannot be on or before startDate',
			// 		},
			// 	});
			// } else

			if (startDate) {
				const createBooking = await Booking.create({
					spotId: spot.spotIdForBooking,
					userId: req.user.id,
					startDate,
					endDate,
				});

				res.status(200).json(createBooking);

				// res.status(200).json({
				// 	id: createBooking.id,
				// 	spotId: createBooking.spotId,
				// 	userId: createBooking.userId,
				// 	startDate: `${createBooking.startDate.getFullYear()}-${createBooking.startDate.getDate()}-${createBooking.startDate.getMonth()}`,
				// 	endDate: `${createBooking.endDate.getFullYear()}-${createBooking.endDate.getDate()}-${createBooking.endDate.getMonth()}`,
				// 	createdAt: createBooking.createdAt,
				// 	updatedAt: createBooking.updatedAt,
				// });
			} else {
				return res.status(403).json(1);
			}
		} else {
			res.status(404).json(statusCode404);
		}

		// const findReview = await Review.findAll({
		// 	where: { spotId: spot.spotId },
		// 	include: [
		// 		{ model: User, attributes: ['id', 'firstName', 'lastName'] },
		// 		{ model: ReviewImage, attributes: ['id', 'url'] },
		// 	],
		// });

		// if (findSpot) {
		// 	const createBooking = await Booking.create({
		// 		spotId: spot.spotIdForBooking,
		// 		userId: req.user.id,
		// 		startDate,
		// 		endDate,
		// 	});
		// 	res.status(200).json(createBooking);
		// } else {
		// 	res.status(404).json(statusCode404);
		// }
	}
);

module.exports = router;

// "XSRF-Token":"XlMibXoV-s-U9NurOoF4ypskHe2BUXzFELC8"
