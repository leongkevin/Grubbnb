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

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateBooking = [
	check('endDate').custom((value, { req }) => {
		if (value < req.body.startDate) {
			throw new Error(['endDate cannot come before startDate']);
		}
		return true;
	}),
	handleValidationErrors,
];

const statusCode404 = {
	message: "Booking couldn't be found",
	statusCode: 404,
};

// Get all of the Current User's Bookings
// Return all the bookings that the current user has made.

// Require Authentication: true

// Request

// Method: GET
// URL: /api/user/bookings
// Body: none
// Successful Response

// Status Code: 200

router.get('/current', requireAuth, async (req, res) => {
	let findBooking = await Booking.findAll({
		where: { userId: req.user.id },
		include: [
			{
				model: Spot,
				attributes: [
					'id',
					'ownerId',
					'address',
					'city',
					'state',
					'country',
					'lat',
					'lng',
					'name',
					'price',
					'price',
				],
				include: { model: SpotImage, attributes: ['url'] },
			},
		],
	});

	// res.json(findBooking);
	let copy = findBooking.map((el) => el.toJSON());

	// res.json(copy);
	copy.forEach((el) => {
		// res.json(el.Spot.SpotImages)
		el.Spot.previewImage = el.Spot.SpotImages;
		delete el.Spot.SpotImages;
	});

	res.status(200).json({
		Bookings: copy,
	});
});

// // Delete a Booking
// // Delete an existing booking.

// // Require Authentication: true

// // Require proper authorization: Booking must belong to the current user or the Spot must belong to the current user

// // Request

// // Method: DELETE
// // URL: /api/spots/:spotId/bookings/:bookingId
// // Body: none
// // Successful Response

// // Status Code: 200

router.delete('/:bookingId', requireAuth, async (req, res) => {
	const { endDate, startDate, createdAt } = req.body;

	const findBooking = await Booking.findByPk(req.params.bookingId);

	// new Date(startDate)
	const date = new Date();

	if (!findBooking) {
		res.status(404).json(statusCode404);
	} else if (new Date(startDate) <= date) {
		// return res.json(date)
		// return res.json(startDate)
		// return res.json(new Date(startDate) > date)
		return res.status(403).json({
			message: "Bookings that have been started can't be deleted",
			statusCode: 403,
		});
	} else if (findBooking.userId === req.user.id) {
		await findBooking.destroy();
		res.status(200).json({
			message: 'Successfully deleted',
			statusCode: 200,
		});
	}
});

// Edit a Booking
// Update and return an existing booking.

// Require Authentication: true

// Require proper authorization: Booking must belong to the current user

// Request

// Method: PUT

// URL: /api/spots/:spotId/bookings/:bookingId

// Headers:

// Content-Type: application/json
// Body:

// {
// 	"startDate": "2021-11-19",
// 	"endDate": "2021-11-20"
// }
// Successful Response

// Status Code: 200

router.put(
	'/:bookingId',

	[requireAuth, validateBooking],

	async (req, res) => {
		// const id = req.params.spotId;
		// const id = req.user.id;
		const { endDate, createdAt } = req.body;

		const date = new Date();
		// return res.json(date)
		// return res.json(new Date(endDate) > date)
		if (new Date(endDate) > date || new Date(startDate) > date) {
			return res.status(403).json({
				message: "Past bookings can't be modified",
				statusCode: 403,
			});
		}

		const findBooking = await Booking.findByPk(req.params.bookingId);
		// res.json(findBooking)
		if (findBooking === null) {
			res.status(404).json(statusCode404);
		}
		const findOwner = await Spot.findByPk(findBooking.spotId);

		// res.json(findOwner)

		if (findOwner.ownerId === req.user.id) {
			findBooking.set({
				startDate: req.body.startDate,
				endDate: req.body.endDate,
			});
			await findBooking.save();
			res.json(findBooking);
		}
	}
);

module.exports = router;
