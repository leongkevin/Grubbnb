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
		spotId: 1,
		url: 'https://www.applesfromny.com/wp-content/uploads/2020/06/SnapdragonNEW.png',
	},
	{
		spotId: 1,
		url: 'https://www.applesfromny.com/wp-content/uploads/2020/06/SnapdragonNEW.png',
	},
	{
		spotId: 2,
		url: 'https://www.applesfromny.com/wp-content/uploads/2020/06/SnapdragonNEW.png',
	},
	{
		spotId: 2,
		url: 'https://www.applesfromny.com/wp-content/uploads/2020/06/SnapdragonNEW.png',
	},
];