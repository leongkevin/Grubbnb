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

const validateReview = [
	check('review').isString().withMessage('Review text is required'),
	check('stars').isInt().withMessage('Stars must be an integer from 1 to 5'),
	handleValidationErrors,
];

const statusCode404 = {
	message: "Review couldn't be found",
	statusCode: 404,
};

// Add an Image to a Review based on the Review's id
// Create and return a new image for a review specified by id.

// Require Authentication: true

// Require proper authorization: Review must belong to the current user

// Request

// Method: POST

// URL: /api/spots/:spotId/reviews

// Status Code: 200

router.post('/:reviewId/images', requireAuth, async (req, res) => {
	const { url } = req.body;
	const id = req.params.reviewId;

	const findReview = await Review.findAll({
		where: { id },
	});
	// res.json(Boolean(findReview[0].id))
	// res.json(parseInt(id))
	// res.json(findReview[0].reviewId === parseInt(id))
	const findReviewImage = await ReviewImage.findAll({
		where: { reviewId: id },
	});
	// res.json(findReviewImage.length)
	// res.json(Boolean(findReview[0] === undefined))
	if (findReview[0] === undefined) {
		res.status(200).json(statusCode404);
	} else if (
		findReview[0].id === parseInt(id) &&
		findReviewImage.length < 10
	) {
		const createReviewImage = await ReviewImage.create({
			reviewId: id,
			url: req.body.url,
		});
		res.status(200).json({
			// createReviewImage,
			id: createReviewImage.id,
			url: createReviewImage.url,
		});
	} else if (findReviewImage.length >= 10) {
		res.status(403).json({
			message: 'Maximum number of images for this resource was reached',
			statusCode: 403,
		});
	}
});

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
			{ model: User, attributes: ['id', 'firstName', 'lastName'] },
			{
				model: Spot,
				attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng'],
				include: [
					{
						model: SpotImage,
						attributes: ['url']
					},
				],
			},

			{ model: ReviewImage, attributes: ['id', 'url'] },
		],
	});
	if (!currentReviewsOfUser[0]) {
		res.status(404).json(statusCode404);
	} else {
		res.status(200).json({ Reviews: currentReviewsOfUser });
	}
});

// Edit a Review
// Update and return an existing review.

// Require Authentication: true

// Require proper authorization: Review must belong to the current user

// Request

// Method: PUT

// URL: /api/reviews/:reviewId

// Headers:

// Content-Type: application/json
// Body:

// {
// 	"review": "This was an awesome spot!",
// 	"stars": 5
// }
// Successful Response

// Status Code: 200

router.put('/:reviewId', [requireAuth, validateReview], async (req, res) => {
	const { userId, spotId, review, stars } = req.body;

	const findReview = await Review.findByPk(req.params.reviewId);
	// res.json(findReview)
	if (findReview === null) {
		res.status(404).json(statusCode404);
	}

	if (findReview.id === parseInt(req.params.reviewId)) {
		findReview.set({
			userId: findReview.userId,
			spotId: findReview.spotId,
			review,
			stars,
		});
		await findReview.save();
		res.json(findReview);
	}
});

// Delete a Review
// Delete an existing review.

// Require Authentication: true

// Require proper authorization: Review must belong to the current user

// Request

// Method: PUT
// URL: /api/reviews/:reviewId
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
// Error response: Couldn't find a Review with the specified id

// Status Code: 404

router.delete('/:reviewId', requireAuth, async (req, res) => {
	const findReview = await Review.findByPk(req.params.reviewId);
	// res.json(req.params.reviewId);
	if (!findReview) {
		res.status(404).json(statusCode404);
	} else if (findReview.userId === req.user.id) {
		await findReview.destroy();
		res.status(200).json({
			message: 'Successfully deleted',
			statusCode: 200,
		});
	}
});

module.exports = router;
