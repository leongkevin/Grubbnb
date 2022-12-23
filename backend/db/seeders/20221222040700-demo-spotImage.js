'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = 'SpotImages';
		return queryInterface.bulkInsert(
			options,
			[
				{
					spotId: 1,
					url: 'https://www.applesfromny.com/wp-content/uploads/2020/06/SnapdragonNEW.png',
					preview: true,
				},
				{
					spotId: 1,
					url: 'https://www.applesfromny.com/wp-content/uploads/2020/06/SnapdragonNEW.png',
					preview: true,
				},
				{
					spotId: 2,
					url: 'https://www.applesfromny.com/wp-content/uploads/2020/06/SnapdragonNEW.png',
					preview: false,
				},
				{
					spotId: 2,
					url: 'https://www.applesfromny.com/wp-content/uploads/2020/06/SnapdragonNEW.png',
					preview: true,
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		options.tableName = 'SpotImages';
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				spotId: {
					[Op.in]: [1, 2],
				},
			},
			{}
		);
	},
};
