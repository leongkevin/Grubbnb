const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/', async (req, res) => {
	res.send('Hello World!');
});

module.exports = router;
