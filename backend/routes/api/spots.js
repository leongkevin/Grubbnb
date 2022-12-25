const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/', async (req, res) => {
	const allSpots = await Spot.findAll();
	res.json(allSpots);
});

router.post('/', async (req, res) => {
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

	// if()
});

module.exports = router;
