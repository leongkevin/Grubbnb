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
					userId: 4,
					spotId: 1,
					review: "The best place I've ever vacationed at!!!",
					stars: 5,
				},
				{
					userId: 5,
					spotId: 1,
					review: "The worst place I've ever vacationed at!!!",
					stars: 1,
				},
				{
					userId: 8,
					spotId: 1,
					review: 'Above average',
					stars: 4,
				},
				{
					userId: 9,
					spotId: 1,
					review: 'Beautiful location with fantastic amenities!',
					stars: 5,
				},
				{
					userId: 10,
					spotId: 1,
					review: 'Loved the clean rooms and friendly staff!',
					stars: 4,
				},
				{
					userId: 14,
					spotId: 1,
					review: 'The scenery was breathtaking and the activities were fun!',
					stars: 5,
				},
				{
					userId: 15,
					spotId: 1,
					review: 'The food was amazing and the service was excellent!',
					stars: 4,
				},
				{
					userId: 16,
					spotId: 1,
					review: 'A little bit pricey but worth it for the experience!',
					stars: 4,
				},
				{
					userId: 17,
					spotId: 1,
					review: 'Great place for a relaxing getaway!',
					stars: 5,
				},
				{
					userId: 18,
					spotId: 1,
					review: 'Fantastic views and wonderful staff!',
					stars: 5,
				},
				{
					userId: 19,
					spotId: 1,
					review: 'Had a wonderful time and will definitely be back!',
					stars: 5,
				},
				{
					userId: 10,
					spotId: 2,
					review: 'The beach was stunning and the water was perfect!',
					stars: 5,
				},
				{
					userId: 11,
					spotId: 2,
					review: 'A bit far from the city but worth the drive!',
					stars: 4,
				},
				{
					userId: 12,
					spotId: 2,
					review: 'The rooms were spacious and comfortable!',
					stars: 4,
				},
				{
					userId: 13,
					spotId: 3,
					review: 'The staff was helpful and accommodating!',
					stars: 4,
				},

				{
					userId: 11,
					spotId: 6,
					review: 'Beautiful location with fantastic amenities!',
					stars: 5,
				},
				{
					userId: 12,
					spotId: 7,
					review: 'Loved the clean rooms and friendly staff!',
					stars: 4,
				},
				{
					userId: 13,
					spotId: 8,
					review: 'The scenery was breathtaking and the activities were fun!',
					stars: 5,
				},
				{
					userId: 14,
					spotId: 9,
					review: 'The food was amazing and the service was excellent!',
					stars: 4,
				},
				{
					userId: 15,
					spotId: 10,
					review: 'A little bit pricey but worth it for the experience!',
					stars: 4,
				},
				{
					userId: 1,
					spotId: 11,
					review: 'Great place for a relaxing getaway!',
					stars: 5,
				},
				{
					userId: 1,
					spotId: 12,
					review: 'Fantastic views and wonderful staff!',
					stars: 5,
				},
				{
					userId: 1,
					spotId: 13,
					review: 'Had a wonderful time and will definitely be back!',
					stars: 5,
				},
				{
					userId: 1,
					spotId: 14,
					review: 'The beach was stunning and the water was perfect!',
					stars: 5,
				},
				{
					userId: 1,
					spotId: 15,
					review: 'A bit far from the city but worth the drive!',
					stars: 4,
				},
				{
					userId: 20,
					spotId: 16,
					review: 'The rooms were spacious and comfortable!',
					stars: 4,
				},
				{
					userId: 1,
					spotId: 17,
					review: 'The staff was helpful and accommodating!',
					stars: 5,
				},
				{
					userId: 13,
					spotId: 18,
					review: 'Beautiful location with fantastic amenities!',
					stars: 5,
				},
				{
					userId: 14,
					spotId: 19,
					review: 'Loved the clean rooms and friendly staff!',
					stars: 4,
				},
				{
					userId: 15,
					spotId: 20,
					review: 'The scenery was breathtaking and the activities were fun!',
					stars: 5,
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
					[Op.in]: [
						1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
						17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29 , 30
					],
				},
			},
			{}
		);
	},
};
