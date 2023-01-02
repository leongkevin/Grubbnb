const express = require('express');

const { requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Review, Booking, SpotImage, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();



module.exports = router;
