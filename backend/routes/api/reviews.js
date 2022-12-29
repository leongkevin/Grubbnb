const express = require('express');

const { requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Review, Booking, SpotImage, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const statusCode404 = {
	message: "Spot couldn't be found",
	statusCode: 404,
};

// router.get('/current', requireAuth, async (req, res) => {

// 	const { user } = req;

// 	const currentReviewsOfUser = await Review.findAll({
// 		where: { userId: user.id },
// 	});
// 	// if (!currentReviewsOfUser[0]) {
// 	// 	res.status(404).json(statusCode404);
// 	// } else {
// 	// 	res.status(200).json(currentReviewsOfUser);
// 	// }
// 	res.status(201).json(user.id);
// });




module.exports = router;
