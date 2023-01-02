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



const statusCode404 = {
	message: "Booking couldn't be found",
	statusCode: 404,
};


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
	const findBooking = await Booking.findByPk(req.params.bookingId);
	// res.json(Boolean(findBooking));
	if (!findBooking) {
		res.status(404).json(statusCode404);
	} else if (findBooking.userId === req.user.id) {
		await findBooking.destroy();
		res.status(200).json({
			message: 'Successfully deleted',
			statusCode: 200,
		});
	}
});

module.exports = router;
