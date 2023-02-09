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
					url: 'https://a0.muscache.com/im/pictures/287ee9eb-73f1-437f-b861-8decac866c2e.jpg?im_w=720',
					preview: true,
				},
				{
					spotId: 1,
					url: 'https://a0.muscache.com/im/pictures/d5529c23-133b-4a60-a815-5d8ed75ccb5b.jpg?im_w=720',
					preview: true,
				},
				{
					spotId: 2,
					url: 'https://a0.muscache.com/im/pictures/97c31459-2471-4261-806e-b274b077a3be.jpg?im_w=720',
					preview: false,
				},
				{
					spotId: 2,
					url: 'https://a0.muscache.com/im/pictures/287ee9eb-73f1-437f-b861-8decac866c2e.jpg?im_w=720',
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
