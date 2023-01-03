const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.json());

const routes = require('./routes');

const { ValidationError } = require('sequelize');

// Security Middleware
if (!isProduction) {
	// enable cors only in development
	app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
	helmet.crossOriginResourcePolicy({
		policy: 'cross-origin',
	})
);

// Set the _csrf token and create req.csrfToken method
app.use(
	csurf({
		cookie: {
			secure: isProduction,
			sameSite: isProduction && 'Lax',
			httpOnly: true,
		},
	})
);

app.use(routes); // Connect all the routes

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
	const err = new Error("The requested resource couldn't be found.");
	err.title = 'Resource Not Found';
	err.errors = ["The requested resource couldn't be found."];
	err.status = 404;
	next(err);
});

// Process sequelize errors
app.use((err, _req, _res, next) => {
	// check if error is a Sequelize error:
	if (err instanceof ValidationError) {
		err.errors = err.errors.map((e) => e.message);
		err.title = 'Validation error';
	}
	next(err);
});

// Error formatter
app.use((err, _req, res, _next) => {
	res.status(err.status || 500);
	console.error(err);

	// if (err.status === 400) {
	// 	res.json({
	// 		message: 'Validation Error',
	// 		statusCode: err.status,
	// 		errors: err.errors,
	// 	});
	// } else {
	// 	res.json({
	// 		title: err.title || 'Server Error',
	// 		message: err.message,
	// 		statusCode: err.status,
	// 		errors: err.errors,
	// 		stack: isProduction ? null : err.stack,
	// 	});
	// }

	if (
		err.errors.toString() ===
		'Start date conflicts with an existing booking'
	) {
		res.json({
			message:
				'Sorry, this spot is already booked for the specified dates',
			statusCode: 403,
			errors: err.errors,
		});
	} else if (
		err.errors.toString() === 'End date conflicts with an existing booking'
	) {
		res.json({
			message:
				'Sorry, this spot is already booked for the specified dates',
			statusCode: 403,
			errors: err.errors,
		});
	} else if (
		err.errors.toString() ==
		[
			'Start date conflicts with an existing booking',
			'End date conflicts with an existing booking',
		]
	) {
		res.json({
			message:
				'Sorry, this spot is already booked for the specified dates',
			statusCode: 403,
			errors: err.errors,
		});
	} else if (
		err.errors.toString() ==
		[
			"email must be unique"
		]
	) {
		res.json({
			message:
			"User already exists",
			statusCode: 403,
			errors: ["User with that email already exists"],
		});
	} else if (err.status === 400) {
		res.json({
			message: 'Validation Error',
			statusCode: err.status,
			errors: err.errors,
		});
	} else {
		res.json({
			title: err.title || 'Server Error',
			message: err.message,
			statusCode: err.status,
			errors: err.errors,
			stack: isProduction ? null : err.stack,
		});
	}
});

module.exports = app;
