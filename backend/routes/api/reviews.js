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
	message: "Spot couldn't be found",
	statusCode: 404,
};

// Get all Reviews of the Current User
// Returns all the reviews written by the current user.

// Require Authentication: true

// Request

// Method: GET
// URL: /api/user/reviews
// Body: none
// Successful Response

// Status Code: 200
router.get('/current', requireAuth, async (req, res) => {
	const { user } = req;

	const currentReviewsOfUser = await Review.findAll({
		where: { userId: user.id },
		include: [
			{ model: User, attributes: ["id", "firstName", "lastName"] },
			{
			  model: Spot, attributes: {exclude: ['description'] },
			  include: [
				{ model: SpotImage, attributes: ["url"], where: { preview: true } },
			  ],
			},
			{ model: ReviewImage, attributes: ["id", "url"] },
		  ],
	});
	if (!currentReviewsOfUser[0]) {
		res.status(404).json(statusCode404);
	} else {
		res.status(200).json({Reviews: currentReviewsOfUser});
	}
});


module.exports = router;
