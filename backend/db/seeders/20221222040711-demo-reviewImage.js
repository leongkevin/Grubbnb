'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = 'ReviewImages';
		return queryInterface.bulkInsert(
			options,
			[
				{
					reviewId: 1,
					url: 'https://www.applesfromny.com/wp-content/uploads/2020/06/SnapdragonNEW.png',
				},
				{
					reviewId: 1,
					url: 'https://www.applesfromny.com/wp-content/uploads/2020/06/SnapdragonNEW.png',
				},
				{
					reviewId: 2,
					url: 'https://www.applesfromny.com/wp-content/uploads/2020/06/SnapdragonNEW.png',
				},
				{
					reviewId: 2,
					url: 'https://www.applesfromny.com/wp-content/uploads/2020/06/SnapdragonNEW.png',
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		options.tableName = 'ReviewImages';
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				reviewId: {
					[Op.in]: [1, 2, 3],
				},
			},
			{}
		);
	},
};
