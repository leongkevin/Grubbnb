'use strict';
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
	options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = 'Users';
		return queryInterface.bulkInsert(
			options,
			[
				{
					firstName: 'John',
					lastName: 'Doe',
					email: 'demo@user.io',
					username: 'Demo-lition',
					hashedPassword: bcrypt.hashSync('password'),
				},
				{
					firstName: 'Fake',
					lastName: 'User',
					email: 'user1@user.io',
					username: 'FakeUser1',
					hashedPassword: bcrypt.hashSync('password2'),
				},
				{
					firstName: 'Jane',
					lastName: 'Doe',
					email: 'user2@user.io',
					username: 'FakeUser2',
					hashedPassword: bcrypt.hashSync('password3'),
				},
				,
				{
					firstName: 'Kevin',
					lastName: 'Leong',
					email: 'kevinleong@user.io',
					username: 'kleong',
					hashedPassword: bcrypt.hashSync('password3'),
				},
				,
				{
					firstName: 'Ahmed',
					lastName: 'Dev',
					email: 'ahmed@dev.com',
					username: 'ahmeddev',
					hashedPassword: bcrypt.hashSync('password3'),
				},
				,
				{
					firstName: 'Ken',
					lastName: 'Ming',
					email: 'kminguser2@user.io',
					username: 'FakeUser210',
					hashedPassword: bcrypt.hashSync('password3'),
				}, // not owners after this (7)
				{
					firstName: 'Jane',
					lastName: 'Smith',
					email: 'janesmith@user.io',
					username: 'JaneSmith',
					hashedPassword: bcrypt.hashSync('secret123'),
				},
				{
					firstName: 'Bob',
					lastName: 'Johnson',
					email: 'bobjohnson@user.io',
					username: 'BobJ',
					hashedPassword: bcrypt.hashSync('password456'),
				},
				{
					firstName: 'Emily',
					lastName: 'Brown',
					email: 'emilybrown@user.io',
					username: 'EmilyB',
					hashedPassword: bcrypt.hashSync('securepass'),
				},
				{
					firstName: 'Michael',
					lastName: 'Davis',
					email: 'michaeldavis@user.io',
					username: 'MikeD',
					hashedPassword: bcrypt.hashSync('123456'),
				},
				{
					firstName: 'Sarah',
					lastName: 'Johnson',
					email: 'sarahjohnson@user.io',
					username: 'SarahJ',
					hashedPassword: bcrypt.hashSync('abcdefg'),
				},
				{
					firstName: 'David',
					lastName: 'Wilson',
					email: 'davidwilson@user.io',
					username: 'DaveW',
					hashedPassword: bcrypt.hashSync('password789'),
				},
				{
					firstName: 'Emily',
					lastName: 'Parker',
					email: 'emilyparker@user.io',
					username: 'EmilyP',
					hashedPassword: bcrypt.hashSync('qwerty'),
				},
				{
					firstName: 'William',
					lastName: 'Anderson',
					email: 'williamanderson@user.io',
					username: 'WillA',
					hashedPassword: bcrypt.hashSync('securepass123'),
				},
				{
					firstName: 'Ava',
					lastName: 'Roberts',
					email: 'avaroberts@user.io',
					username: 'AvaR',
					hashedPassword: bcrypt.hashSync('mypassword'),
				},
				{
					firstName: 'Sarah',
					lastName: 'Lee',
					email: 'sarahlee@dev.com',
					username: 'sarahlee',
					hashedPassword: bcrypt.hashSync('secret123'),
				},
				{
					firstName: 'Michael',
					lastName: 'Smith',
					email: 'michael@dev.com',
					username: 'michaelsmith',
					hashedPassword: bcrypt.hashSync('password456'),
				},
				{
					firstName: 'Emily',
					lastName: 'Jones',
					email: 'emilyjones@dev.com',
					username: 'emilyjones',
					hashedPassword: bcrypt.hashSync('secret789'),
				},
				{
					firstName: 'David',
					lastName: 'Wilson',
					email: 'david@dev.com',
					username: 'davidwilson',
					hashedPassword: bcrypt.hashSync('password111'),
				},
				{
					firstName: 'Jennifer',
					lastName: 'Davis',
					email: 'jennifer@dev.com',
					username: 'jenniferdavis',
					hashedPassword: bcrypt.hashSync('secret222'),
				},
				{
					firstName: 'William',
					lastName: 'Martin',
					email: 'william@dev.com',
					username: 'williammartin',
					hashedPassword: bcrypt.hashSync('password333'),
				},
				{
					firstName: 'Elizabeth',
					lastName: 'Miller',
					email: 'elizabeth@dev.com',
					username: 'elizabethmiller',
					hashedPassword: bcrypt.hashSync('secret444'),
				},
				{
					firstName: 'Christopher',
					lastName: 'Wilson',
					email: 'christopher@dev.com',
					username: 'christopherwilson',
					hashedPassword: bcrypt.hashSync('password555'),
				},
				{
					firstName: 'Joseph',
					lastName: 'Harris',
					email: 'joseph@dev.com',
					username: 'josephharris',
					hashedPassword: bcrypt.hashSync('secret666'),
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		options.tableName = 'Users';
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				username: {
					[Op.in]: [
						'Demo-lition',
						'FakeUser1',
						'FakeUser2',
						'kleong',
						'ahmeddev',
						'FakeUser210',
						'JaneSmith',
						'BobJ',
						'EmilyB',
						'MikeD',
						'SarahJ',
						'DaveW',
						'EmilyP',
						'WillA',
						'AvaR',
						'sarahlee',
						'michaelsmith',
						'emilyjones',
						'davidwilson',
						'jenniferdavis',
						'williammartin',
						'elizabethmiller',
						'christopherwilson',
						'josephharris',
					],
				},
			},
			{}
		);
	},
};
