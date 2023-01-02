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
	message: "Spot Image couldn't be found",
	statusCode: 404,
};

// Delete a Spot Image
// Delete an existing image for a Spot.

// Require Authentication: true

// Require proper authorization: Spot must belong to the current user

// Request

// Method: DELETE
// URL: /api/images/:imageId
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
// Error response: Couldn't find a Spot Image with the specified id

// Status Code: 404

router.delete('/:spotImageId', requireAuth, async (req, res) => {
	const findSpotImage = await SpotImage.findByPk(req.params.spotImageId);
	// res.json(Boolean(findSpotImage));
	if (!findSpotImage) {
		res.status(404).json(statusCode404);
	} else {
		await findSpotImage.destroy();
		res.status(200).json({
			message: 'Successfully deleted',
			statusCode: 200,
		});
	}
});

module.exports = router;
