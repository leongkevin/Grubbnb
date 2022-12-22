'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
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

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};


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
];
