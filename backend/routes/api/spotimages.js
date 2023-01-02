const express = require('express');

const { requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Review, Booking, SpotImage, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.delete('/:spotImageId', requireAuth, async (req, res) => {
	// const spot = await SpotImage.findByPk(req.params.spotId);

	// if (!spot) {
	// 	res.status(404).json(statusCode404);
	// } else if (spot.ownerId === req.user.id) {
	// 	await spot.destroy();
	// 	res.status(200).json({
	// 		message: 'Successfully deleted',
	// 		statusCode: 200,
	// 	});
	// 	// res.json({ message: spot});
	// }
});

module.exports = router;
