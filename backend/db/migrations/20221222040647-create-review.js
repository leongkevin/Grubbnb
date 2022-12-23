'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = 'Reviews';
		return queryInterface.createTable(options, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				reference: {
					model: 'Users',
					key: 'id',
				},
			},
			spotId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				reference: {
					model: 'Spots',
					key: 'id',
				},
			},
			reviews: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			stars: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Reviews');
	},
};
