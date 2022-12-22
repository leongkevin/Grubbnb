'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};

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
		name: 'Asphalt Green',
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
		name: 'Asphalt Green',
		description: 'Contemporary',
		price: 100,
	},
];
