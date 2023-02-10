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
					url: 'https://media.architecturaldigest.com/photos/55e770d8302ba71f3016cfd2/1:1/w_600,h_600,c_limit/dam-images-decor-2015-03-kara-ross-kara-ross-stephen-ross-manhattan-penthouse-02-living-room.jpg',
				},
				{
					reviewId: 1,
					url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/priors-crescent-living-room-haus-interiors-show-home-1602462623.jpg?crop=0.668xw:1.00xh;0.0731xw,0&resize=640:*',
				},
				{
					reviewId: 2,
					url: 'https://www.homebunch.com/wp-content/uploads/2016/09/Family-room-Beautiful-Homes-of-Instagram-Sumhouse_Sumwear.jpg',
				},
				{
					reviewId: 2,
					url: 'https://www.homebunch.com/wp-content/uploads/2016/09/Stairway-landing-Beautiful-Homes-of-Instagram-Sumhouse_Sumwear.jpg',
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
					[Op.in]: [1, 2, 3, 4],
				},
			},
			{}
		);
	},
};
