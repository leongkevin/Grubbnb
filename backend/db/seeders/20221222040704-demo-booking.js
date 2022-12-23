'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = 'Bookings';
		return queryInterface.bulkInsert(
			options,
			[
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		options.tableName = 'Bookings';
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				username: {
					[Op.in]: [],
				},
			},
			{}
		);
	},
};
