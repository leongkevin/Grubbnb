'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = 'Reviews';
		return queryInterface.bulkInsert(
			options,
			[
				{
					userId: 1,
					spotId: 1,
					review: "The best place I've ever vacationed at!!!",
					stars: 5,
				},
				{
					userId: 1,
					spotId: 1,
					review: "The worst place I've ever vacationed at!!!",
					stars: 1,
				},
				{
					userId: 1,
					spotId: 1,
					review: 'Above average',
					stars: 4,
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		options.tableName = 'Reviews';
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				id: {
					[Op.in]: [1, 2, 3],
				},
			},
			{}
		);
	},
};
