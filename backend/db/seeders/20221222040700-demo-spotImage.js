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
					preview: true,
				},
				{
					spotId: 3,
					url: 'https://a0.muscache.com/im/pictures/287ee9eb-73f1-437f-b861-8decac866c2e.jpg?im_w=720',
					preview: true,
				},
				{
					spotId: 4,
					url: 'https://a0.muscache.com/im/pictures/miso/Hosting-673753152039498122/original/b279ff57-201a-4990-9d47-69314a7213d2.jpeg?im_w=720',
					preview: true,
				},
				{
					spotId: 5,
					url: 'https://a0.muscache.com/im/pictures/miso/Hosting-668850861862940741/original/7091a16d-00c8-404f-a4cf-85fad49f7e82.jpeg?im_w=720',
					preview: true,
				},
				{
					spotId: 6,
					url: 'https://a0.muscache.com/im/pictures/aeace06d-d05d-4093-827b-b662e82f4fc2.jpg?im_w=720',
					preview: true,
				},
				{
					spotId: 7,
					url: 'https://a0.muscache.com/im/pictures/8388e64a-4ae1-4d25-9463-7b9e62a29e6a.jpg?im_w=720',
					preview: true,
				},
				{
					spotId: 8,
					url: 'https://a0.muscache.com/im/pictures/e54b06ba-d45c-4a86-a375-74945ca2d3b5.jpg?im_w=720',
					preview: true,
				},
				{
					spotId: 9,
					url: 'https://a0.muscache.com/im/pictures/d5529c23-133b-4a60-a815-5d8ed75ccb5b.jpg?im_w=720',
					preview: true,
				},
				{
					spotId: 10,
					url: 'https://a0.muscache.com/im/pictures/fbb353f6-bc3a-4bc0-8dc4-061fc3f4d56b.jpg?im_w=720',
					preview: true,
				},
				{
					spotId: 11,
					url: 'https://a0.muscache.com/im/pictures/7cd4a007-7c01-4eed-93b2-f526c46d524a.jpg?im_w=720',
					preview: true,
				},
				{
					spotId: 12,
					url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47848053/original/0fdf3439-a3ec-442d-b859-9ccf5710c0be.jpeg?im_w=720',
					preview: true,
				},
				{
					spotId: 13,
					url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-730409411509164968/original/6ab561f1-519b-4b7c-bc1c-6095448c9908.jpeg?im_w=720',
					preview: true,
				},
				{
					spotId: 14,
					url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-646530559834491603/original/e0badfc6-cf4c-48c1-bf67-007cedbc996d.jpeg?im_w=720',
					preview: true,
				},
				{
					spotId: 15,
					url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-53452954/original/fd0e58e4-9c95-4b2d-ab92-ac3ab9c66461.jpeg?im_w=720',
					preview: true,
				},
				{
					spotId: 16,
					url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-50663395/original/9d247928-1e01-43c9-95ad-59fd34cc56e7.jpeg?im_w=720',
					preview: true,
				},
				{
					spotId: 17,
					url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-43998758/original/af9b2fa5-9b1c-44d2-bd8f-c82aa68afa21.jpeg?im_w=720',
					preview: true,
				},
				{
					spotId: 18,
					url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-782606782721623470/original/ee8625fe-2159-4573-94f8-d732e6c1c293.jpeg?im_w=720',
					preview: true,
				},
				{
					spotId: 19,
					url: 'https://a0.muscache.com/im/pictures/miso/Hosting-51249886/original/5b093395-0e00-459e-8242-264b22fa8914.jpeg?im_w=720',
					preview: true,
				},
				{
					spotId: 20,
					url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-22074547/original/f24d7471-066e-4d50-93b0-ffe6c8616ced.jpeg?im_w=720',
					preview: true,
				},
				{
					spotId: 21,
					url: 'https://a0.muscache.com/im/pictures/miso/Hosting-632559338333153225/original/886d2e58-fcf9-4956-9a1a-730ae4147aa7.jpeg?im_w=720',
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
