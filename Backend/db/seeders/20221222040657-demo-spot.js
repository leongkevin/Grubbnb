'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = 'Spots';
		return queryInterface.bulkInsert(
			options,
			[
				{
					ownerId: 1,
					address: '1065 6th Ave',
					city: 'New York',
					state: 'New York',
					lat: 40.75376,
					lng: -73.98496,
					name: '5 Bryant Park',
					description: 'Contemporary',
					price: 100,
				},
				{
					ownerId: 2,
					address: '555 E 90th St',
					city: 'New York',
					state: 'New York',
					lat: 40.77771,
					lng: -73.94331,
					name: 'Asphalt Green UES',
					description: 'Antiquated',
					price: 100,
				},
				{
					ownerId: 2,
					address: '212 North End Ave',
					city: 'New York',
					state: 'New York',
					lat: 40.71597,
					lng: -74.01475,
					name: 'Asphalt Green BPC',
					description: 'Contemporary',
					price: 100,
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		options.tableName = 'Spots';
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				name: {
					[Op.in]: ['5 Bryant Park', 'Asphalt Green UES', 'Asphalt Green BPC'],
				},
			},
			{}
		);
	},
};
